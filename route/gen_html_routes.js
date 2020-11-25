const express = require("express");
const router = express.Router();
const report = require("../controllers/report");

router.get('/', report.getHTML)
router.get('/download', report.getFile)
router.get('/output', report.test)

module.exports = router;