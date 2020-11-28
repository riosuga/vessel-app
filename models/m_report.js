const conn = require('../config/db')

exports.getData = async function(kode_data ,callback){
	if(kode_data == '01'){
		let sql = `select a.id_kapal as 'ID Kapal', mmsi, vessel_name as 'Nama Kapal', b.jenis_kapal as 'Jenis Kapal', 
				   bendera_kapal as 'Bendera Kapal' , callsign from tb_data_kapal a
				   join tb_data_kapal_detail b on a.id_kapal = b.id_kapal`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err,{kode :'500', message : 'Gagal mendapat data laporan 01'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 01', result : results});
		})
	}else if(kode_data == '02'){
		let sql = `select vessel_name as 'Nama Kapal', gt_kapal as 'GT Kapal', panjang_kapal as 'Panjang Kapal', 
				   lebar_kapal as 'Lebar Kapal', dimensi_dalam_kapal as 'Dimensi Kapal', isi_bersih as 'Isi Bersih Kapal' from tb_data_kapal a
				   join tb_data_kapal_detail b on a.id_kapal = b.id_kapal`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '03'){
		let sql = `select vessel_name as 'Nama Kapal', bahan_kapal as 'Bahan Kapal', penggerak_kapal as 'Penggerak Kapal', 
				   jml_cerobong as 'Jumlah Cerobong', merk_mesin as 'Merk Mesin', daya as 'Daya', jml_baling as 'Jumlah Baling' from tb_data_kapal a
				   join tb_data_kapal_detail b on a.id_kapal = b.id_kapal`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '04'){
		let sql = `select a.id_kapal as 'ID Kapal', mmsi, vessel_name as 'Nama Kapal', 
					last_latitude as 'Latitude', last_longitude as 'Longitude', b.koordinat_laut as 'Kordinat Laut'
					from tb_data_kapal a
					join tb_data_kapal_detail b on a.id_kapal = b.id_kapal`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '05'){
		let sql = `select  mmsi, vessel_name as 'Nama Kapal', 
					last_latitude as 'Latitude', last_longitude as 'Longitude', concat(left(jarak_pelabuhan_terdekat/1000,7),' Km') as 'Jarak Kapal dengan Pelabuhan',
					b.nama_pelabuhan as 'Nama Pelabuhan'
					from tb_data_kapal a
					join tr_pelabuhan b on a.id_pelabuhan_terdekat = b.id_pelabuhan
					where id_pelabuhan_terdekat is not null`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '06'){
		let sql = `select  mmsi, vessel_name as 'Nama Kapal', 
					last_latitude as 'Latitude', last_longitude as 'Longitude', concat(left(jarak_pelabuhan_last/1000,7),' Km') as 'Jarak Kapal dengan Pelabuhan',
					b.nama_pelabuhan as 'Nama Pelabuhan'
					from tb_data_kapal a
					join tr_pelabuhan b on a.id_pelabuhan_last = b.id_pelabuhan
					where id_pelabuhan_last is not null`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '07'){
		let sql = `select a.id_kapal as 'ID Kapal',mmsi, vessel_name as 'Nama Kapal', c.nama_pj as 'Nama Penanggung Jawab', c.contact as 'Kontak' 
				   from tb_data_kapal a
				   join tr_pemilik_kapal b on a.id_kapal = b.id_kapal
				   join tb_user c on b.id_user = c.id_user`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '08'){
		let sql = `select vessel_name as 'Nama Kapal',mmsi, b.tujuan,b.koordinat_laut as 'Posisi Kapal', c.nama_pelabuhan as 'Nama Pelabuhan', c.nama_kabkota as 'Nama Kabupaten/Kota Pelabuhan'
					from tb_data_kapal a
					join tb_data_kapal_detail b on a.id_kapal = b.id_kapal
					join tr_pelabuhan c on a.id_pelabuhan_last = c.id_pelabuhan`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '09'){
		let sql = `select nama_pelabuhan as 'Nama Pelabuhan', kd_pelabuhan as 'Kode Pelabuhan',
					latitude, longitude,
					case when flag_aktif = 'Y' then
					'Area Pelindo 2'
					else
					'Bukan Area Pelindo 2'
					end as 'Area Pelabuhan',
					nama_kabkota as 'Nama Kabupaten/Kota Pelabuhan'
					from tr_pelabuhan`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else if(kode_data == '10'){
		let sql = `select vessel_name as 'Nama Kapal',mmsi, 
					last_received_time_utc_unix as 'Taktu Penerimaan data Ais',
					waktu_laporan as 'Waktu Laporan', b.koordinat_laut as 'Koordinat Laut', a.wk_upd as 'Waktu Update Data Kapal'
					from tb_data_kapal a
					join tb_data_kapal_detail b on a.id_kapal = b.id_kapal`;
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else{
		callback(null, {kode :'500', message : 'Jenis Laporan tidak ditemukan'})
	}
}