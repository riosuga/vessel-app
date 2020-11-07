const mysql = require('mysql');

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'db_vessel'
// });

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'pps1',
  password: 'PPS1W3b#',
  database: 'db_vessel'
});


// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Terkonak dengan DB');
// });


exports.insert = function(nama_table, data){
	//get fields
	// console.log(data)
	let ret_val = false;
	let sql = "INSERT INTO "+ nama_table +" SET ?";

	var promising = new Promise(function(resolve, reject) {
		let query = conn.query(sql, data,(err, results) => {
			if(err){ 
				// throw err;
				console.log(err)
				reject(err)
			}else{
				console.log("berhasil insert data pada table "+nama_table);
				resolve(true)
			}
		});
	});

	return promising;

}	


exports.update = function(nama_table, where, data){
	let ret_val = false;
	let sql = "UPDATE "+ nama_table+ " SET ? WHERE "+where+ " = ?";

	var promising = new Promise(function(resolve, reject){
		let query = conn.query(sql, data, (err, results) => {
			if(err){
				cosnole.log(err);
				reject(err);
			}else{
				console.log('berhasil update data table' + nama_table);
			}
		});
	});

	return promising;
}


exports.delete = function(nama_table, where, data){
	let ret_val = false;

	if(where = ""){
		let sql = "DELETE FROM "+ nama_table;
	}else{
		let sql = "DELETE FROM "+ nama_table+ " WHERE "+where+ " = ?";
	}

	var promising = new Promise(function(resolve, reject){
		let query = conn.query(sql, data, (err, results) => {
			if(err){
				cosnole.log(err);
				reject(err);
			}else{
				console.log('berhasil delete data table' + nama_table);
			}
		});
	});

	return promising;
}

module.exports  = conn;
// exports.conn = conn;