import React, { useState } from "react";
import Header from "./components/Header";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DaftarKegiatan from "./components/DaftarKegiatan";
import Pengaturan from "./components/Pengaturan";
import Grid from "@mui/material/Grid";

function App() {
  const [value, setValue] = React.useState(0);
  const [namaKaryawan, setNamaKaryawan] = useState("Timothy Pradana");
  const [rate, setRate] = useState(12000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <h1 style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        HH Timesheet
      </h1>

      <Card style={{ margin: "20px" }}>
        <Grid container style={{ margin: "20px" }}>
          <Grid item xs={12} sm={2}>
            <label style={{ textAlign: "left" }}>Nama Karyawan</label>
            <br></br>
            <label style={{ textAlign: "left" }}>{namaKaryawan}</label>
          </Grid>
          <Grid item xs={12} sm={10}>
            <label style={{ textAlign: "left" }}>Rate</label>
            <br></br>
            <label style={{ textAlign: "left" }}>Rp.{rate}/jam</label>
          </Grid>
        </Grid>
        <CardContent>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Daftar Kegiatan" />
            <Tab label="Pengaturan" />
          </Tabs>
          {value === 0 && <DaftarKegiatan />}
          {value === 1 && (
            <Pengaturan namaKaryawan={namaKaryawan} rate={rate} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
