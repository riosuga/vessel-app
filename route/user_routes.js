const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.get('/', user.user)
router.get('/listUser',user.getListUser)
router.post('/detail_user', user.getDetailUser)
router.post('/add_user', user.addUser)
router.post('/update_user', user.updateUser)
router.post('/delete_user', user.deleteUser)

module.exports = router;