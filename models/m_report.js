const conn = require('../config/db')

exports.getData = async function(kode_data ,callback){
	if(kode_data == '01'){
		let sql = "SELECT * FROM tr_referensi_data limit 5";
		conn.query(sql, (err, results) => {
			if(err) throw callback(err,{kode :'500', message : 'Gagal mendapat data laporan 01'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 01', result : results});
		})
	}else if(kode_data == '02'){
		let sql = "SELECT * FROM tb_data_kapal limit 5";
		conn.query(sql, (err, results) => {
			if(err) throw callback(err, {kode :'500', message : 'Gagal mendapat data laporan 02'});
			callback(null,{kode :'200', message : 'Sukses mendapat data laporan 02', result : results});
		})
	}else{
		callback(null, {kode :'500', message : 'Jenis Laporan tidak ditemukan'})
	}
}