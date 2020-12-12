const LocalStrategy = require('passport-local').Strategy;
const conn = require('./db')

exports.authConfig = (passport)=> {
    passport.serializeUser(function(user, done) {
      done(null, user.id_user);
    });

    passport.deserializeUser(function(id, done) {
      conn.query('SELECT * FROM tb_user WHERE id_user = ?', [id], function(err, user) {
        if(err) return done(err);
        done(null, user);
      });
    });

    passport.use(new LocalStrategy(
      function(username, password, done) {
        conn.query("SELECT * FROM tb_user WHERE username = ? and password = ? and flag_aktif ='Y'", 
        [username, password], function(err, rows, fields) {
          if(err) return done(err);
        
          // if user not found
          if (rows.length <= 0) {
            // return done('salah username/ password');
             done(null, false, {message : 'salah username/ password'});
          }else{
            return done(null, rows[0]);
          } 
          
        });
      }
    ));
}

exports.isAuthenticated = (req, res, next) => {
  // console.log(req.isAuthenticated())
  if (req.isAuthenticated())
    return next();
  res.redirect('/auth/login');
}