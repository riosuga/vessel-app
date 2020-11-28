const conn = require('../config/db')
const hbs = require('hbs')
const fs = require('fs')

function renderPageError(req,res, sess, message){
  hbs.registerPartial('content', fs.readFileSync( './views/error_page/505Page.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], message : message, url : '/reference/pemilik_kapal/'})
}


//===================================================== referensi  =======================================================
exports.getListReference = async function(callback){
  let sql = "SELECT * FROM tr_referensi_data";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addReference = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tr_referensi_data WHERE kd_grup = ? AND kode = ?", 
    [data_referensi.kd_grup, data_referensi.kode], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, data refrensi sudah ada')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tr_referensi_data(kd_grup, kode, uraian, keterangan) values (?,?,?,?) ", 
          [data_referensi.kd_grup, data_referensi.kode, data_referensi.uraian, data_referensi.keterangan], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
            }else{
              res.redirect('/reference/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan data referensi')
      } 
    })
}

exports.updateReference = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("UPDATE tr_referensi_data SET kd_grup = ?, kode = ?, uraian = ?, keterangan = ? WHERE kd_grup = ? AND kode = ?", 
    [data_referensi.kd_grup, data_referensi.kode, data_referensi.uraian, data_referensi.keterangan, data_referensi.kd_grup, data_referensi.kode], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data Referensi')
      }else{
        res.redirect('/reference/')
      }
    })
}

exports.deleteReference = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_referensi_data WHERE kd_grup = ? and kode =?", 
    [data_referensi.kd_grup, data_referensi.kode],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/')
      }
    })
}

//===================================================== region  =======================================================
exports.getListRegion = async function(callback){
  let sql = "SELECT * FROM tr_region";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addRegion = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tr_region WHERE propinsi = ? and kabupaten = ? and kecamatan = ? and kelurahan = ?", 
    [data_referensi.propinsi,data_referensi.kabupaten,data_referensi.kecamatan,data_referensi.kelurahan], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, data refrensi sudah ada')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tr_region(propinsi, kabupaten, kecamatan, kelurahan) values (?,?,?,?) ", 
          [data_referensi.propinsi,data_referensi.kabupaten,data_referensi.kecamatan,data_referensi.kelurahan], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
            }else{
              res.redirect('/reference/region/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan data referensi')
      } 
    })
}

exports.updateRegion = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("UPDATE tr_region SET propinsi = ?, kabupaten = ?, kecamatan = ?, kelurahan = ? WHERE id_region = ?", 
    [data_referensi.propinsi,data_referensi.kabupaten,data_referensi.kecamatan,data_referensi.kelurahan, data_referensi.id_region], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data Referensi')
      }else{
        res.redirect('/reference/region/')
      }
    })
}

exports.deleteRegion = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_region WHERE id_region = ?", 
    [data_referensi.id_region],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/region/')
      }
    })
}
//===================================================== negara  =======================================================
exports.getListNegara = async function(callback){
  let sql = "SELECT * FROM tr_negara";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addNegara = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tr_negara WHERE nama_negara = ?", 
    [data_referensi.nama_negara], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, data refrensi sudah ada')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tr_negara(nama_negara) values (?) ", 
          [data_referensi.nama_negara], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
            }else{
              res.redirect('/reference/negara/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan data referensi')
      } 
    })
}

exports.updateNegara = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("UPDATE tr_negara SET nama_negara = ? where id_bendera_kapal = ?", 
    [data_referensi.nama_negara, data_referensi.id_bendera_kapal], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data Referensi')
      }else{
        res.redirect('/reference/negara/')
      }
    })
}

exports.deleteNegara = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_negara WHERE id_bendera_kapal = ?", 
    [data_referensi.id_bendera_kapal],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/negara/')
      }
    })
}
//===================================================== pelabuan ======================================================
exports.getListPelabuhan = async function(callback){
  let sql = "SELECT * FROM tr_pelabuhan";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addPelabuhan = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tr_pelabuhan WHERE kd_pelabuhan = ? or nama_pelabuhan = ?", 
    [data_referensi.kd_pelabuhan, data_referensi. nama_pelabuhan], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, data refrensi sudah ada')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tr_pelabuhan(latitude, longitude, kd_pelabuhan, nama_pelabuhan, nama_kab_kota, flag_aktif) values (?,?,?,?,?,'Y')", 
          [data_referensi.latitude, data_referensi.longitude, data_referensi.kd_pelabuhan, data_referensi.nama_pelabuhan, data_referensi.nama_kab_kota], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
            }else{
              res.redirect('/reference/pelabuhan/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan data referensi')
      } 
    })
}

exports.updatePelabuhan = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("UPDATE tr_pelabuhan SET latitude = ?, longitude = ?, kd_pelabuhan = ?, nama_pelabuhan = ?, nama_kab_kota = ?, flag_aktif = 'N' WHERE id_pelabuhan = ?", 
    [data_referensi.latitude, data_referensi.longitude, data_referensi.kd_pelabuhan, data_referensi.nama_pelabuhan, data_referensi.nama_kab_kota, data_referensi.id_pelabuhan], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data Referensi')
      }else{
        res.redirect('/reference/pelabuhan/')
      }
    })
}

exports.deletePelabuhan = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_pelabuhan WHERE id_pelabuhan = ?", 
    [data_referensi.id_pelabuhan],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/pelabuhan/')
      }
    })
}
//===================================================== Tujuan ========================================================
exports.getListTujuan = async function(callback){
  let sql = "SELECT * FROM tr_tujuan";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addTujuan = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tr_tujuan WHERE nama_tujuan = ?", 
    [data_referensi.nama_tujuan], function(err, rows, fields) {
      if(err){
        renderPageError(req,res,sess,'Mohon maaf, data refrensi sudah ada')
      }else if (rows.length <= 0) {
        conn.query("INSERT INTO tr_tujuan(id_pelabuhan, nama_tujuan) values (?, ?) ", 
          [data_referensi.id_pelabuhan, data_referensi.nama_tujuan], 
          function(err2, rows2, fields2) {
            if(err2){
              renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
            }else{
              res.redirect('/reference/tujuan/')
            }
          })
      }else{
        renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengecekan data referensi')
      } 
    })
}

exports.updateTujuan = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("UPDATE tr_tujuan SET id_pelabuhan = ?, nama_tujuan = ? where id_tujuan = ?", 
    [data_referensi.id_pelabuhan, data_referensi.nama_tujuan, data_referensi.id_tujuan], 
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal Update data Referensi')
      }else{
        res.redirect('/reference/tujuan/')
      }
    })
}

exports.deleteTujuan = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_tujuan WHERE id_bendera_kapal = ?", 
    [data_referensi.id_bendera_kapal],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/tujuan/')
      }
    })
}
//===================================================== Pemilik Kapal =================================================
exports.getListPemilik_kapal = async function(callback){
  let sql = "SELECT * FROM tr_pemilik_kapal a join tb_user b on a.id_user = b.id_user join tb_data_kapal c on a.id_kapal = c.id_kapal";
  conn.query(sql, (err, results) => {
      if(err) throw callback(err,null);
        callback(null,results);
    })
}

exports.addPemilik_kapal = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tb_data_kapal where MMSI like ?", ['%'+data_referensi.mmsi+'%'], function(err, rows, fields){
    if(err){
      renderPageError(req,res,sess,'Mohon maaf, terjadi kesalahan dalam pengecekan data kapal')
    }else if(rows.length <= 0){
      renderPageError(req,res,sess,'Mohon maaf, Data kapal berdasarkan MMSI anda, tidak ditemukan')
    }else{
      let id_kapal = rows[0].id_kapal
      conn.query("SELECT * FROM tr_pemilik_kapal where id_kapal = ?", [id_kapal], function(err2, rows2, fields2){
          if(err2){
            console.log(err2)
            renderPageError(req,res,sess,'Mohon maaf, terjadi kesalahan dalam pengecekan data pemilik kapal')
          }else if(rows2.length <= 0){
              conn.query("INSERT INTO tr_pemilik_kapal(id_kapal, id_user) values (?, ?) ", 
              [id_kapal, sess['id_user']], 
              function(err3, rows3, fields3) {
                if(err3){
                  console.log(err3)
                  renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
                }else{
                  res.redirect('/reference/pemilik_kapal/')
                }
              })
          }else{
            renderPageError(req,res,sess,'Mohon maaf, Data kapal tersebut sudah dimiliki user lain')
          }
      })
    }
  })
}

exports.updatePemilik_kapal = async function(req,res,sess){
  var data_referensi = req.body
  await conn.query("SELECT * FROM tb_data_kapal where MMSI like ?", ['%'+data_referensi.mmsi+'%'], function(err, rows, fields){
    if(err){
      renderPageError(req,res,sess,'Mohon maaf, terjadi kesalahan dalam pengecekan data kapal')
    }else if(rows.length <= 0){
      renderPageError(req,res,sess,'Mohon maaf, Data kapal berdasarkan MMSI anda, tidak ditemukan')
    }else{
      let id_kapal = rows[0].id_kapal
      conn.query("SELECT * FROM tr_pemilik_kapal where id_kapal = ?", [id_kapal], function(err2, rows2, fields2){
          if(err2){
            console.log(err2)
            renderPageError(req,res,sess,'Mohon maaf, terjadi kesalahan dalam pengecekan data pemilik kapal')
          }else if(rows2.length <= 0){
              conn.query("UPDATE tr_pemilik_kapal SET id_kapal =?, id_user =? where id_pemilik_kapal = ?", 
              [id_kapal, sess['id_user'], data_referensi.id_pemilik_kapal], 
              function(err3, rows3, fields3) {
                if(err3){
                  console.log(err3)
                  renderPageError(req,res,sess,'Mohon maaf, Terdapat error pada pengisian data referensi')
                }else{
                  res.redirect('/reference/pemilik_kapal/')
                }
              })
          }else{
            renderPageError(req,res,sess,'Mohon maaf, Data kapal tersebut sudah dimiliki user lain')
          }
      })
    }
  })
}

exports.deletePemilik_kapal = async function(req,res,sess){
  var data_referensi = req.body
  conn.query("DELETE FROM tr_pemilik_kapal WHERE id_pemilik_kapal = ?", 
    [data_referensi.id_pemilik_kapal],
    function(err2, rows2, fields2) {
      if(err2){
        renderPageError(req,res,sess,'Mohon maaf, Gagal hapus data Referensi')
      }else{
        res.redirect('/reference/pemilik_kapal/')
      }
    })
}