const express = require("express");
const router = express.Router();
const report = require("../controllers/report");

router.get('/', report.getHTML)

module.exports = router;