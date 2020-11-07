// require('./frontend/main')

var main = require(__dirname+'/frontend/main_get_data')

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const conn = require(__dirname+'/config/db')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

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
//=========================== LOGIN =============================
app.use(flash());
passport.use(new LocalStrategy(
  function(username, password, done) {
    conn.query('SELECT * FROM tb_user WHERE username = ? and password = ?', 
    [username, password], function(err, rows, fields) {
      if(err) return done(err);
    
      // if user not found
      if (rows.length <= 0) {
        // req.flash('kontol');
        // return done('Incorrect username or password.');
        return done()
      } 
      return done(null, rows[0]);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id_user);
});

passport.deserializeUser(function(id, done) {
  conn.query('SELECT * FROM tb_user WHERE id_user = ?', [id], function(err, user) {
    if(err) return done(err);
    done(null, user);
  });
});

app.use(require('express-session')(
  { secret: 'keyboard cat', resave: false, saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
    res.redirect('/login');
}

function writeSessionOrang(req, res){
  let data_user = JSON.parse(JSON.stringify(req.user))
  return data_user[0]['nama_pj'];
  // res.setHeader('Content-Type', 'text/html')
  // res.write("<script type =\"module\">$('#nama_user1').html('"+data_user[0]['nama_pj']+"');$('#nama_user2').html('"+data_user[0]['nama_pj']+"')</script>")
  // res.write("<script type =\"module\">document.getElementById('nama_user1').innerHTML = 'Hello World';</script>")
  // res.end()
}

app.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
  }),
  function(req, res) {
    res.redirect('/');
});

app.get('/login',(req, res) => {    
    // res.render('test_maps');
    // hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/home.html', 'utf8'));
    res.render('login', {message: req.flash('kontollllllll')})
});


app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
});

//============================================= bagian nembak data main/ get data ===============================================
app.get('/getDataKapal', isAuthenticated,(req, res)=>{   
 	main.getKapal(res);
})

app.get('/getPelabuhan', isAuthenticated,(req, res)=>{   
  main.getPelabuhanRes(res);
})

app.post('/searchKapal', isAuthenticated,(req, res)=>{   
  main.searchKapal(res, req.body.mmsi)
})

app.post('/getKapalByTujuan', isAuthenticated,(req, res)=>{   
  main.getKapalByTujuan(res, req.body.port)
})

app.post('/getDataKapalByType', isAuthenticated,(req, res)=>{   
  main.getKapalByType(res, req.body.type_kapal)
})

app.post('/getKapalByNearPelabuhan',(req, res)=>{   
  main.getKapalByNearPelabuhan(res, req.body.port)
})

app.post('/trackingKapal', isAuthenticated, (req,res) =>{
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
//============================================= start halaman modul utama ===============================================

app.get('/',(req, res) => {    
  	// res.render('test_maps');
    // let sess = writeSessionOrang(req,res) 
    let sess ='moncrottt'
  	hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/home.html', 'utf8'));
  	res.render('main', {nama_orang : sess})
});

app.get('/traffic', isAuthenticated,(req,res) =>{
	hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/traffic_map.html', 'utf8'));
  let sess = writeSessionOrang(req,res)
	res.render('main', {nama_orang : sess})
})

app.get('/ship', isAuthenticated,(req,res) =>{
  let sess = writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/ship_map.html', 'utf8'));
  main.getTypeKapal(res, sess)
})

app.get('/voyage', isAuthenticated,(req,res) =>{
  let sess = writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/voyage_map.html', 'utf8'));
  // res.render('main', {nama_orang : sess})
  main.getTujuanKapal(res, sess)
})

app.get('/history', isAuthenticated,(req,res) =>{
  let sess = writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/history_map.html', 'utf8'));
  res.render('main', {nama_orang : sess})
})

app.get('/port', isAuthenticated,(req,res) =>{
  let sess = writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/port_map.html', 'utf8'));
  main.getPelabuhan(res, sess)
})

//============================================= end halaman modul utama ===============================================
//============================================= start halaman modul login ===============================================
app.get('/user_list', isAuthenticated,(req,res) =>{
  let sess = writeSessionOrang(req,res) 
  hbs.registerPartial('content', fs.readFileSync( __dirname + '/views/layout/user.html', 'utf8'));
  res.render('main', {nama_orang : sess})
})


//============================================= end halaman modul login ===============================================

app.listen(8000, () => {
  console.log('Server is running at port 8000');    
}); 