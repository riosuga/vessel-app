var haversine = require("haversine-distance");
var async = require('async');
const conn = require('../knex/knex.js');



//First point in your haversine calculation
// var point1 = { lat: 128.175598, lng: -3.694885 }

//Second point in your haversine calculation
// var point2 = { lat: 103.889, lng: 1.0992 }

// var haversine_m = haversine(point1, point2); //Results in meters (default)
// var haversine_km = haversine_m /1000; //Results in kilometers

// console.log("distance (in meters): " + haversine_m + "m");
// console.log("distance (in kilometers): " + haversine_km + "km");

// async function olahData(){
// 	let nama_pelabuhan;
// 	let nama_kapal;
// 	let tr_pelabuhan = conn.select().table('tr_pelabuhan')
// 	tr_pelabuhan.then(rows => {
// 		rows.forEach( function(data, index) {
// 			// statements
// 			console.log(data['nama_pelabuhan'])
// 			if(data['id_pelabuhan'] == 315){
// 				nama_pelabuhan.push(data['nama_pelabuhan'])
// 			}
// 		});
// 	})

// 	let tb_temp_data_kapal = conn.select().table('tb_temp_data_kapal')
// 	tb_temp_data_kapal.then(rows => {
// 		rows.forEach( function(data, index) {
// 			if(data['id_penarikan'] == 1){
// 				// console.log(data['mmsi'])
// 			}
// 		});
// 	})


// 	console.log(nama_pelabuhan)

// }

function getDataPelabuhan(){
	let data_pelabuhan = []
	return conn.select().table('tr_pelabuhan').where('id_pelabuhan',[453]).then(rows => {
		rows.forEach( function(data, index) {
			tampung_pelabuhan = {
				latitude : data['latitude'],
				longitude : data['longitude'],
				id_pelabuhan : data['id_pelabuhan']
			}

			data_pelabuhan.push(tampung_pelabuhan);
		});

		return data_pelabuhan;
	});
}

function getDataKapalTemp(){
	let data_kapal = []
	return conn.select().table('tb_temp_data_kapal').where('flag_tarik','N').then(rows => {
		rows.forEach(function(data, index) {
			tampung_kapal = {
				last_latitude : data['latitude'],
				last_longitude : data['longitude'],
				mmsi : data['mmsi'],
				id_kapal : data['id_kapal'],
				vessel_name : data['vessel_name'],
				last_received_time_utc_unix : data['received_time_utc_unix'],
				jenis_kapal : data['jenis_kapal'],
				icon_kapal : data['icon_kapal'],
				last_heading : data['heading'],
 				id_penarikan : data['id_penarikan']
			}

			data_kapal.push(tampung_kapal);
		});

		return data_kapal;
	});
}

function getDataKapal(id_kapal){
	return conn.select('id_kapal').table('tb_data_kapal').where('id_kapal', id_kapal).first()
}

function moveDataKapalHistory(id_kapal, data){
	// conn.insert(conn.select().from('tb_data_kapal').where('id_kapal', id_kapal)).into('tb_history_data_kapal').then(result =>{
	// 	conn.table('tb_data_kapal').where('id_kapal', id_kapal).del().then(results =>{
	// 		insertDataKapal(data);
	// 	})
	// }).catch(err =>{
	// 	console.log(err)
	// })


	return conn.from(conn.raw('?? (??,??,??,??,??,??,??,??,??,??,??,??)',
					['tb_history_data_kapal', 'id_kapal','mmsi','vessel_name','last_heading','last_received_time_utc_unix'
					,'jenis_kapal','icon_kapal','last_latitude','last_longitude','flag_tetap','jarak_pelabuhan_last','id_pelabuhan_last']))
					 .insert(function (){
					 	this.from('tb_data_kapal').where('id_kapal', id_kapal).select('id_kapal','mmsi','vessel_name','last_heading',
					 		'last_received_time_utc_unix','jenis_kapal','icon_kapal','last_latitude','last_longitude','flag_tetap',
					 		'jarak_pelabuhan_last','id_pelabuhan_last')
					 }).then(results =>{
					 	updateDataKapal(id_kapal, data);
					 }).catch(err =>{
					 	console.log(err)
					 })
}

function insertDataKapal(data){
	return conn.table('tb_data_kapal').insert(data).catch(err =>{
		console.log(err)
	})
}

function updateDataKapal(id_kapal, data){
	return conn.table('tb_data_kapal').update(data).where('id_kapal', id_kapal).catch(err =>{
		console.log(err)
	})
}

function updateFlagPenarikanDataKapal(id_penarikan){
	return conn.table('tb_temp_data_kapal').update({flag_tarik : 'Y'}).where('id_penarikan', id_penarikan).catch(err =>{
		console.log(err)
	})
}

async function olahData(){
	let data_pelabuhan = await getDataPelabuhan();
	let data_kapal = await getDataKapalTemp();

	for(let i = 0; i < data_kapal.length; i++){
		// if(i > 50){
		// 	continue;
		// }

		// let ret_val
		//cek id kapal yang utama
        let id_penarikan =  data_kapal[i]['id_penarikan']
        await updateFlagPenarikanDataKapal(data_kapal[i]['id_penarikan'])
        delete data_kapal[i]['id_penarikan']
		let point_a = {lat : data_pelabuhan[0]['latitude'], lng : data_pelabuhan[0]['longitude']}
		let point_b = {lat : data_kapal[i]['last_latitude'], lng : data_kapal[i]['last_longitude']}

		let jarak_by_haversine = haversine(point_b, point_a);

		data_kapal[i]['id_pelabuhan_last'] = data_pelabuhan[0]['id_pelabuhan']
		data_kapal[i]['jarak_pelabuhan_last'] = jarak_by_haversine

		let ada_kapal = await getDataKapal(data_kapal[i]['id_kapal'])
		if(ada_kapal != null){
			console.log("start update data kapal ==============="+ data_kapal[i]['vessel_name'] +"===============")
			if(jarak_by_haversine/1000 <= 10){
				data_kapal[i]['flag_tetap'] = 'Y'
				await moveDataKapalHistory(data_kapal[i]['id_kapal'], data_kapal[i])
			}else{
				data_kapal[i]['flag_tetap'] = 'N'
				await moveDataKapalHistory(data_kapal[i]['id_kapal'], data_kapal[i])
			}

		}else{
			console.log("start insert data kapal ==============="+ data_kapal[i]['vessel_name'] +"===============")
			if(jarak_by_haversine/1000 <= 10){
				data_kapal[i]['flag_tetap'] = 'Y'
				await insertDataKapal(data_kapal[i])
			}else{
				// data_kapal[i]['flag_tetap'] = 'X'
				// delete data_kapal[i]['id_pelabuhan_last']
				// await insertDataKapal(data_kapal[i])
			}
		}
	}

	conn.destroy();
}

olahData();