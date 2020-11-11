const conn = require('../config/db')

exports.daftar = function(req,res){
  var data_daftar = req.body
  conn.query("SELECT * FROM tb_user WHERE username = ? or email = ?", 
    [data_daftar.username, data_daftar.password], function(err, rows, fields) {
      if(err){
        res.send({kode : '500', message: 'Ada masalah teknis harap hubungi tim teknis'})
      }else if (rows.length <= 0) {
        console.log(data_daftar)
        conn.query("INSERT INTO tb_user(username, email, password, nama_pj, perusahaan, alamat_perusahaan, contact, role_user, flag_aktif) values (?,?,?,?,?,?,?, '03','Y') ", 
          [data_daftar.username, data_daftar.email, data_daftar.password, data_daftar.nama_pj, data_daftar.perusahaan, data_daftar.alamat_perusahaan, data_daftar.contact], 
          function(err2, rows2, fields2) {
            if(err2){
              console.log(err2)
              res.send({kode : '500', message: 'Ada masalah dalam pendaftaran teknis harap hubungi tim teknis'})
            }else{
              res.send({kode : '200', message: 'Selamat akun anda berhasil didaftarkan'})
            }
          })
      }else{
        res.send({kode : '500', message: 'Username/Email telah didaftarkan silahkan coba kembali'})
      } 
    })
}