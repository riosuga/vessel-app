const passport = require("passport");
const model = require('../models/m_user')

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.json({
                msg: err
            })
        }

        if (!user) {
            return res.json({
                msg: "Email or password incorrect"
            })
        }

        // res.redirect('/main_module')
        res.json({
            msg: "Success, you've been logged in ",
            user : {
                "id" : user.id,
                "email" : user.email,
                "nama_orang" : user.nama_pj,
                "role_user" : user.role_user
            }
        })
    })(req, res, next)
}

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

exports.get_login =(req, res, next)=>{

    if(typeof req.user !== 'undefined'){
        let data_user = JSON.parse(JSON.stringify(req.user))
        if(data_user[0]['nama_pj'] != ''){
            console.log('masuk sini')
            res.redirect('/main_module')
        }
    }else{
        let hbs = require('hbs');
        let fs = require('fs');
        hbs.registerPartial('content', fs.readFileSync( './views/layout/home.html', 'utf8'));
        res.render('login')
    }
}

exports.daftar = (req, res, next)=>{
    model.daftar(req, res);
}