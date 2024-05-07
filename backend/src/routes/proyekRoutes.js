const express = require("express");
const router = express.Router();
const ProyekController = require("../controllers/proyek");

router.get("/", ProyekController.getAllProyeks);

router.post("/", ProyekController.createProyek);

module.exports = router;
