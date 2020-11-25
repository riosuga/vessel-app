const express = require("express");
const router = express.Router();
const report = require("../controllers/report");

router.get('/', report.getHTML)
router.get('/cetak_laporan', report.report)
router.post('/generate_laporan', report.genReport)

router.get('/test', report.genReport)

module.exports = router;