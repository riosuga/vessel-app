process.env.NODE_ENV = 'production';

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth_config = require("./config/authConfig");

const path = require('path');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

//setting vieww
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
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '/public')))
//auth main module

const auth = require(__dirname+"/route/auth_routes");
const main_module = require(__dirname+"/route/main_modules_routes");
const user_routes = require(__dirname+"/route/user_routes");
const reference = require(__dirname+"/route/reference_routes");
const report = require(__dirname+"/route/report_routes");
const gen_html = require(__dirname+"/route/gen_html_routes");

app.use(
    session({
        name: 'session-id',
        secret: 'scret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            expires: 600000
        }
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
auth_config.authConfig(passport);

// Routes
app.use("/", auth)
app.use("/auth", auth);
app.use('/gen_html',gen_html);
app.use("/report", auth_config.isAuthenticated, report);
app.use("/reference", auth_config.isAuthenticated, reference);
app.use("/main_module", auth_config.isAuthenticated, main_module);
app.use("/user", auth_config.isAuthenticated, user_routes);

app.listen(8000, () => {
  console.log('Server is running at port 8000');    
}); 