require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

const proyekRoutes = require("./src/routes/proyekRoutes");
const kegiatanRoutes = require("./src/routes/kegiatanRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/proyek", proyekRoutes);
app.use("/api/kegiatan", kegiatanRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
