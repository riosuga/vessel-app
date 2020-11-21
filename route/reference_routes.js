const express = require("express");
const router = express.Router();
const reference = require("../controllers/reference");

//===================================================== reference  ====================================================
router.get('/', reference.reference)
router.post('/add_reference', reference.addReference)
router.post('/update_reference', reference.updateReference)
router.post('/delete_reference', reference.deleteReference)
//===================================================== region  =======================================================
router.get('/region/', reference.region)
router.post('/region/add_reference', reference.addRegion)
router.post('/region/update_reference', reference.updateRegion)
router.post('/region/delete_reference', reference.deleteRegion)
//===================================================== negara  =======================================================
router.get('/negara/', reference.negara)
router.post('/negara/add_reference', reference.addNegara)
router.post('/negara/update_reference', reference.updateNegara)
router.post('/negara/delete_reference', reference.deleteNegara)
//===================================================== pelabuan ======================================================
router.get('/pelabuhan/', reference.pelabuhan)
router.post('/pelabuhan/add_reference', reference.addPelabuhan)
router.post('/pelabuhan/update_reference', reference.updatePelabuhan)
router.post('/pelabuhan/delete_reference', reference.deletePelabuhan)
//===================================================== Tujuan ========================================================
router.get('/tujuan/', reference.tujuan)
router.post('/tujuan/add_reference', reference.addTujuan)
router.post('/tujuan/update_reference', reference.updateTujuan)
router.post('/tujuan/delete_reference', reference.deleteTujuan)
//===================================================== Pemilik Kapal =================================================
router.get('/pemilik_kapal/', reference.pemilik_kapal)
router.post('/pemilik_kapal/add_reference', reference.addPemilik_kapal)
router.post('/pemilk_kapal/update_reference', reference.updatePemilik_kapal)
router.post('/pemilik_kapal/delete_reference', reference.deletePemilik_kapal)

module.exports = router;