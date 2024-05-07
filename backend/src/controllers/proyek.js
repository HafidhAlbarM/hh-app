const Proyek = require("../models/proyek");

exports.getAllProyeks = async (req, res) => {
  try {
    const proyek = await Proyek.findAll();
    res.json(proyek);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createProyek = async (req, res) => {
  const { nama_proyek } = req.body;
  try {
    const newProyek = await Proyek.create({
      nama_proyek,
    });
    res.status(201).json(newProyek);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
