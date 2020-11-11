const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require('passport')

router.post("/login",passport.authenticate('local', { successRedirect: '/main_module',
                                                	  failureRedirect: '/auth/login' }),
													  authController.login);
router.get("/login", authController.get_login);
router.get("/", authController.get_login);
router.get("/logout", authController.logout);

router.post('/daftar', authController.daftar)

module.exports = router;