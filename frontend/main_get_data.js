const conn = require('../config/db')

exports.getKapal = async function(res){
	let sql = "SELECT * FROM tb_data_kapal a left join tb_data_kapal_detail b on a.id_kapal = b.id_kapal";
  	let ret_val = conn.query(sql, (err, results) => {
  		if(err) throw err;
  		res.send(results)
  	})
}

exports.searchKapal = async function(res, mmsi){
	let sql = "SELECT * FROM tb_data_kapal a left join tb_data_kapal_detail b on a.id_kapal = b.id_kapal where mmsi like '%"+mmsi+"%'";
	let ret_val = conn.query(sql, (err, results) => {
  		if(err) throw err;
  		  if(results === undefined || results.length == 0){
          sql2 = "SELECT *, longitude as last_longitude, latitude as last_latitude FROM tr_pelabuhan where kd_pelabuhan = '"+mmsi+"'";
          console.log(sql2)
          conn.query(sql2, (err2, results2) => {
             if(err2) throw err2;
             if(results2 === undefined || results2.length == 0){
                // res.status(404)
                res.send([])
             }else{
              res.send(results2)
             }
          })
        }else{
          res.send(results)
        }
  	})
}

exports.getKapalByType = async function(res, type_kapal){
	let sql = "SELECT * FROM tb_data_kapal a left join tb_data_kapal_detail b on a.id_kapal = b.id_kapal where a.jenis_kapal ='"+type_kapal+"'";
	console.log(sql);	
	let ret_val = conn.query(sql, (err, results) => {
  		if(err) throw err;
  		res.send(results)
  	})
}

exports.getTypeKapal = async function(res, sess){
	let sql = "SELECT DISTINCT jenis_kapal FROM tb_data_kapal";	
	conn.query(sql, (err, results) => {
  		if(err) throw err; 
  		res.render('main',{
		    data_jenis_kapal: results,
        nama_orang : sess
		 });
  	})
}


exports.getPelabuhanRes = async function(res){
  let sql = "SELECT * FROM tr_pelabuhan where flag_aktif ='Y'"; 
  conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results)
    })
}

exports.getPelabuhan = async function(res, sess){
  let sql = "SELECT * FROM tr_pelabuhan where flag_aktif ='Y'"; 
  conn.query(sql, (err, results) => {
      if(err) throw err; 
      res.render('main',{
        data_pelabuhan: results,
        nama_orang : sess
     });
    })
}

exports.getTujuanKapal = async function(res, sess){
  let sql = "SELECT DISTINCT tujuan FROM tb_data_kapal_detail where tujuan is not null"; 
  conn.query(sql, (err, results) => {
      if(err) throw err; 
      res.render('main',{
        data_tujuan: results,
        nama_orang : sess
     });
    })
}

exports.getKapalByNearPelabuhan = async function(res, id_pelabuhan){
  let sql = "SELECT *, left(jarak_pelabuhan_last/1000,7) as jarak_pelabuhan_last FROM tb_data_kapal a left join tb_data_kapal_detail b on a.id_kapal = b.id_kapal where id_pelabuhan_last ='"+id_pelabuhan+"' and flag_tetap ='Y'";
  let ret_val = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results)
    })
}

exports.getKapalByTujuan = async function(res, tujuan){
  let sql = "SELECT *, left(jarak_pelabuhan_last/1000,7) as jarak_pelabuhan_last FROM tb_data_kapal a join tb_data_kapal_detail b on a.id_kapal = b.id_kapal where b.tujuan ='"+tujuan+"'";
  let ret_val = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(results)
    })
}