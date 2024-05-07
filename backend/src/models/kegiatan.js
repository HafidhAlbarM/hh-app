const { DataTypes } = require("sequelize");
const sequelize = require("../../database");
const Proyek = require("./proyek");

const Kegiatan = sequelize.define("Kegiatan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judul_kegiatan: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  id_proyek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proyek,
      key: "id",
    },
  },
  tanggal_mulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  tanggal_berakhir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  waktu_mulai: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: "00:00",
  },
  waktu_berakhir: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: "00:00",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Kegiatan.belongsTo(Proyek, { foreignKey: "id_proyek" });

module.exports = Kegiatan;
