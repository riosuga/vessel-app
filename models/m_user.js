const conn = require('../config/db')
const hbs = require('hbs');
const fs = require('fs');


function renderPageError(req,res, sess, message){
  hbs.registerPartial('content', fs.readFileSync( './views/error_page/505Page.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], message : message, url : '/user/'})
}

exports.daftar = function(req,res){
  var data_daftar = req.body
  conn.query("SELECT * FROM tb_user WHERE username = ? or email = ?", 
    [data_daftar.username, data_daftar.password], function(err, rows, fields) {
      if(err){
        res.send({kode : '500', message: 'Ada masalah teknis harap hubungi tim teknis'})
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tb_user(username, email, password, nama_pj, perusahaan, alamat_perusahaan, contact, role_user, flag_aktif) values (?,?,?,?,?,?,?, '03','Y') ", 
          [data_daftar.username, data_daftar.email, data_daftar.password, data_daftar.nama_pj, data_daftar.perusahaan, data_daftar.alamat_perusahaan, data_daftar.contact], 
          function(err2, rows2, fields2) {
            if(err2){
              // res.send({kode : '500', message: 'Ada masalah dalam pendaftaran teknis harap hubungi tim teknis'})
              renderPageError(req,res,sess,'Mohon maaf, gagal dalam mendaftarkan user')
            }else{
              // res.send({kode : '200', message: 'Selamat akun anda berhasil didaftarkan'})
              res.redirect('/auth/login/')
            }
          })
      }else{
        // res.send({kode : '500', message: 'Username/Email telah didaftarkan silahkan coba kembali'})
        renderPageError(req,res,sess,'Username/Email telah didaftarkan silahkan coba kembali')
      } 
    })
}

exports.getListUser = async function(res, sess){
  if(sess['role_user'] != '03'){
    let sql = "SELECT * FROM tb_user";
    let ret_val = conn.query(sql, (err, results) => {
      if(err) throw err;
      // console.log(sql)
      res.send(results)
    })
  }else{
    let sql = "SELECT * FROM tb_user where id_user = '"+sess['id_user']+"'";
      let ret_val = conn.query(sql, (err, results) => {
      if(err) throw err;
      // console.log(sql)
      res.send(results)
    })
  }    
}

exports.getListUser_callback = async function(callback, sess){
  if(sess['role_user'] != '03'){
    let sql = "SELECT * FROM tb_user";
    conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
  }else{
    let sql = "SELECT * FROM tb_user where id_user = '"+sess['id_user']+"'";
    conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
  }

  
}

exports.getDetailUser = async function(req, res){
  let id_user = req.body.id_user
  conn.query("SELECT * FROM tb_user WHERE id_user = ?", [id_user], function(err, rows, fields){
      if(err){
        res.send({kode : '500', message: 'Ada masalah teknis dalam pencarian user harap hubungi tim teknis'})
      }else{
        res.send({kode : '200', message: rows})
      }
  })

}

exports.addUser = async function(req,res,sess){
  var data_daftar = req.body
  await conn.query("SELECT * FROM tb_user WHERE username = ? or email = ?", 
    [data_daftar.username, data_daftar.password], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, User telah tedaftar')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tb_user(username, email, password, nama_pj, perusahaan, alamat_perusahaan, contact, role_user, flag_aktif) values (?,?,?,?,?,?,?, ?,'Y') ", 
          [data_daftar.username, data_daftar.email, data_daftar.password, data_daftar.nama_pj, data_daftar.perusahaan, data_daftar.alamat_perusahaan, data_daftar.contact, data_daftar.role_user], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pendaftaran')
            }else{
              res.redirect('/user/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan pendaftaran')
      } 
    })
}

exports.updateUser = async function(req,res,sess){
  var data_daftar = req.body
  conn.query("UPDATE tb_user SET username = ?, email = ?, password =?, nama_pj =?, perusahaan =?, alamat_perusahaan =?, contact =?, role_user = ?,"+
            "flag_aktif ='Y' WHERE id_user = ?", 
    [data_daftar.username, data_daftar.email, data_daftar.password, data_daftar.nama_pj, data_daftar.perusahaan, data_daftar.alamat_perusahaan, data_daftar.contact, data_daftar.role_user, data_daftar.id_user], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data User')
      }else{
        res.redirect('/user/')
      }
    })
}


exports.deleteUser = async function(req,res,sess){
  var data_daftar = req.body
  conn.query("DELETE FROM tb_user WHERE id_user = ?", 
    [data_daftar.id_user], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data User')
      }else{
        res.redirect('/user/')
      }
    })
}