// require('./frontend/main')

var main = require(__dirname+'/frontend/main_get_data')

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

//library templateting dan folder name
app.set('/views',path.join(__dirname,'views'));
app.set('view engine', 'hbs');

var partialsDir = __dirname + '/views/template';
var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).html$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1]; 
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, '/public')))
//end of library templateting dan folder name

//============================================= bagian nembak data main/ get data ===============================================
app.get('/getDataKapal',(req, res)=>{   
 	main.getKapal(res);
})

app.get('/getPelabuhan',(req, res)=>{   
  main.getPelabuhanRes(res);
})

app.post('/searchKapal',(req, res)=>{   
  main.searchKapal(res, req.body.mmsi)
})

app.post('/getDataKapalByType',(req, res)=>{   
  main.getKapalByType(res, req.body.type_kapal)
})

app.post('/getKapalByNearPelabuhan',(req, res)=>{   
  main.getKapalByNearPelabuhan(res, req.body.port)
})

app.post('/trackingKapal', (req,res) =>{
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
})

//============================================= buat halaman/ redirect halaman ===============================================

app.get('/',(req, res) => {    
  	// res.render('test_maps');
  	hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/home.html', 'utf8'));
  	res.render('main')
});

app.get('/traffic',(req,res) =>{
	hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/traffic_map.html', 'utf8'));
	res.render('main');
})

app.get('/ship',(req,res) =>{
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/ship_map.html', 'utf8'));
  main.getTypeKapal(res)
})

app.get('/voyage',(req,res) =>{
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/voyage_map.html', 'utf8'));
  // res.render('main');
  main.getTujuanKapal(res)
})

app.get('/history',(req,res) =>{
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/history_map.html', 'utf8'));
  res.render('main');
})

app.get('/port',(req,res) =>{
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/port_map.html', 'utf8'));
  main.getPelabuhan(res)
})

// app.get('/test', (req,res) =>{
// 	res.render('test_maps');
// })

app.listen(8000, () => {
  console.log('Server is running at port 8000');    
}); 