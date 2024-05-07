const Kegiatan = require("../models/kegiatan");
const Proyek = require("../models/proyek");

exports.getAllKegiatans = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findAll({
      include: {
        model: Proyek,
        attributes: ["nama_proyek"],
      },
    });
    const modifiedKegiatan = kegiatan.map((item) => ({
      id: item.id,
      judul_kegiatan: item.judul_kegiatan,
      id_proyek: item.id_proyek,
      tanggal_mulai: item.tanggal_mulai,
      tanggal_berakhir: item.tanggal_berakhir,
      waktu_mulai: item.waktu_mulai,
      waktu_berakhir: item.waktu_berakhir,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      nama_proyek: item.Proyek.nama_proyek,
    }));

    console.log(modifiedKegiatan);
    res.json(modifiedKegiatan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getKegiatanById = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findByPk(req.params.id);
    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan not found" });
    }
    res.json(kegiatan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createKegiatan = async (req, res) => {
  const {
    judul_kegiatan,
    id_proyek,
    tanggal_mulai,
    tanggal_berakhir,
    waktu_mulai,
    waktu_berakhir,
  } = req.body;
  try {
    const newKegiatan = await Kegiatan.create({
      judul_kegiatan,
      id_proyek,
      tanggal_mulai,
      tanggal_berakhir,
      waktu_mulai,
      waktu_berakhir,
    });
    res.status(201).json(newKegiatan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateKegiatan = async (req, res) => {
  const {
    judul_kegiatan,
    id_proyek,
    tanggal_mulai,
    tanggal_berakhir,
    waktu_mulai,
    waktu_berakhir,
  } = req.body;
  try {
    const kegiatan = await Kegiatan.findByPk(req.params.id);
    if (!kegiatan) {
      return res.status(404).json({ message: "Material not found" });
    }
    kegiatan.judul_kegiatan = judul_kegiatan;
    kegiatan.id_proyek = id_proyek;
    kegiatan.tanggal_mulai = tanggal_mulai;
    kegiatan.tanggal_berakhir = tanggal_berakhir;
    kegiatan.waktu_mulai = waktu_mulai;
    kegiatan.waktu_berakhir = waktu_berakhir;
    await kegiatan.save();
    res.json(kegiatan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteKegiatan = async (req, res) => {
  try {
    const kegiatan = await Kegiatan.findByPk(req.params.id);
    if (!kegiatan) {
      return res.status(404).json({ message: "Kegiatan not found" });
    }
    await kegiatan.destroy();
    res.json({ message: "Kegiatan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
