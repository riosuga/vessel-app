const hbs = require('hbs');
const fs = require('fs');
const util = require('../util/util')
const model = require('../models/m_user')


exports.user = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/user.html', 'utf8'));
	model.getListUser_callback(function(err, data){
		if(err){
			res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: null})
		}else{
			if(sess['role_user'] != '03'){
				res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data, isAdmin : true})
			}else{
				res.render('main', {nama_orang : sess['nama_pj'], role_user : sess['role_user'], results: data, isAdmin : false})
			}
		}
	},sess)
}

exports.getListUser = function(req, res){   
	let sess = util.writeSessionOrang(req,res) 
 	model.getListUser(res, sess);
}

exports.getDetailUser = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	model.getDetailUser(req,res);
}

exports.addUser =function(req, res){
	// console.log(req.body.username)
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/user.html', 'utf8'));
	model.addUser(req,res,sess)
}

exports.updateUser = function(req, res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/user.html', 'utf8'));
	model.updateUser(req,res,sess)
}

exports.deleteUser = function(req,res){
	let sess = util.writeSessionOrang(req,res) 
	hbs.registerPartial('content', fs.readFileSync( './views/layout/user.html', 'utf8'));
	model.deleteUser(req,res,sess)
}