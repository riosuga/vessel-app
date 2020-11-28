const hbs = require('hbs');
const fs = require('fs');
const util = require('../util/util')
const model = require('../models/m_main_module')


exports.main = function(req, res){
	let sess = util.writeSessionOrang(req,res)
	hbs.registerPartial('content', fs.readFileSync( './views/layout/home.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user']})
}

exports.traffic = function(req,res){
	hbs.registerPartial('content', fs.readFileSync( './views/layout/traffic_map.html', 'utf8'));
  let sess = util.writeSessionOrang(req,res)
	res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user']})
}

exports.ship = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/ship_map.html', 'utf8'));
  model.getTypeKapal(res, sess)
}

exports.voyage = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/voyage_map.html', 'utf8'));
  // res.render('main', {nama_orang : sess})
  model.getTujuanKapal(res, sess)
}

exports.history = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/history_map.html', 'utf8'));
  res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user']})
}

exports.port = function(req,res){
  let sess = util.writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( './views/layout/port_map.html', 'utf8'));
  model.getPelabuhan(res, sess)
}

exports.getDataKapal = function(req, res){   
 	model.getKapal(res);
}

exports.getPelabuhan = function(req, res){   
  model.getPelabuhanRes(res);
}

exports.searchKapal = function(req, res){   
  model.searchKapal(res, req.body.mmsi)
}

exports.getKapalByTujuan = function(req, res){   
  model.getKapalByTujuan(res, req.body.port)
}

exports.getDataKapalByType = function(req, res){   
  model.getKapalByType(res, req.body.type_kapal)
}

exports.getKapalByNearPelabuhan = function(req, res){   
  model.getKapalByNearPelabuhan(res, req.body.port)
}

exports.trackingKapal = function(req,res){
    var axios = require('axios')
    var qs = require('querystring')
    var url = 'https://sehati.hubla.dephub.go.id/Ais/TrackingKapal'

    console.log(req.body.kapal)
    var requestBody = {
          id: req.body.kapal
        }

    var config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }

    axios.post(url, qs.stringify(requestBody), config)
    .then((result) => {
      res.send(JSON.stringify(result.data))
    })
    .catch((err) => {
      console.log(err)
    })
}

//module dashboard
exports.dashboardCount = function(req,res){
  model.dashboardCount(res)
}

exports.dashboardCountJmlKapalTujuan = function(req,res){
  model.dashboardCountJmlKapalTujuan(res)
}

exports.dashboardCountJmlKapalTerdekat = function(req,res){
  model.dashboardCountJmlKapalTerdekat(res)
}


exports.dashboardCountJmlKapalBendera = function(req,res){
  model.dashboardCountJmlKapalBendera(res)
}


exports.dashboardCountJmlJenisKapal = function(req,res){
  model.dashboardCountJmlJenisKapal(res)
}
