const express = require("express");
const router = express.Router();
const main_modules = require("../controllers/main_modules");

router.get("/", main_modules.main);
router.get("/traffic", main_modules.traffic);
router.get("/ship", main_modules.ship);
router.get("/voyage", main_modules.voyage);
router.get("/history", main_modules.history);
router.get("/port", main_modules.port);

//library pencarian
router.get("/getDataKapal", main_modules.getDataKapal);
router.get("/getPelabuhan", main_modules.getPelabuhan);
router.post("/searchKapal", main_modules.searchKapal);
router.post("/getKapalByTujuan", main_modules.getKapalByTujuan);
router.post("/getDataKapalByType", main_modules.getDataKapalByType);
router.post("/getKapalByNearPelabuhan", main_modules.getKapalByNearPelabuhan);
router.post("/trackingKapal", main_modules.trackingKapal);


//library dashboard
router.post("/dashboardCount", main_modules.dashboardCount);
router.post("/dashboardCountJmlKapalTujuan", main_modules.dashboardCountJmlKapalTujuan);
router.post("/dashboardCountJmlKapalTerdekat", main_modules.dashboardCountJmlKapalTerdekat);
router.post("/dashboardCountJmlKapalBendera", main_modules.dashboardCountJmlKapalBendera);
router.post("/dashboardCountJmlJenisKapal", main_modules.dashboardCountJmlJenisKapal);

module.exports = router;