const express = require("express");
const router = express.Router();
const KegiatanController = require("../controllers/kegiatan");

router.get("/", KegiatanController.getAllKegiatans);

router.get("/:id", KegiatanController.getKegiatanById);

router.post("/", KegiatanController.createKegiatan);

router.put("/:id", KegiatanController.updateKegiatan);

router.delete("/:id", KegiatanController.deleteKegiatan);

module.exports = router;
