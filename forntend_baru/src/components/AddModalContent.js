import React, { useState, useEffect } from "react";
import { DialogContent, DialogActions, Button, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function AddModalContent({ handleClose, ambilData, kegiatanData }) {
  const [id, setId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedTime1, setSelectedTime1] = useState("");
  const [selectedTime2, setSelectedTime2] = useState("");
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [proyekOptions, setProyekOptions] = useState([]);
  const [selectedProyek, setSelectedProyek] = useState("");

  useEffect(() => {
    console.log("kegiatanData", kegiatanData);
    if (kegiatanData != null) {
      setId(kegiatanData.id);
      setSelectedDate(kegiatanData.tanggal_mulai);
      setSelectedDate2(kegiatanData.tanggal_berakhir);
      setSelectedTime1(kegiatanData.waktu_mulai);
      setSelectedTime2(kegiatanData.waktu_berakhir);
      setJudulKegiatan(kegiatanData.judul_kegiatan);
      setSelectedProyek(kegiatanData.id_proyek);
    } else {
      setSelectedDate(null);
      setSelectedDate2(null);
      setSelectedTime1("");
      setSelectedTime2("");
      setJudulKegiatan("");
      setSelectedProyek("");
    }
  }, [kegiatanData]);

  useEffect(() => {
    fetch("http://localhost:3001/api/proyek")
      .then((response) => response.json())
      .then((data) => {
        setProyekOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching proyek data:", error);
      });
  }, []);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDateChange2 = (event) => {
    setSelectedDate2(event.target.value);
  };

  const handleTimeChange1 = (event) => {
    setSelectedTime1(event.target.value);
  };

  const handleTimeChange2 = (event) => {
    setSelectedTime2(event.target.value);
  };

  const handleJudulKegiatan = (event) => {
    setJudulKegiatan(event.target.value);
  };

  const handleProyekChange = (event) => {
    setSelectedProyek(event.target.value);
  };

  const handleSimpan = () => {
    const dataKegiatan = {
      judul_kegiatan: judulKegiatan,
      id_proyek: selectedProyek,
      tanggal_mulai: selectedDate,
      tanggal_berakhir: selectedDate,
      waktu_mulai: selectedTime1,
      waktu_berakhir: selectedTime2,
    };

    if (id == null) {
      fetch("http://localhost:3001/api/kegiatan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataKegiatan),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
          ambilData();
          handleClose();
        })
        .catch((error) => {
          console.error("Error posting kegiatan data:", error);
        });
    } else {
      fetch(`http://localhost:3001/api/kegiatan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataKegiatan),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
          ambilData();
          handleClose();
        })
        .catch((error) => {
          console.error("Error editing kegiatan data:", error);
        });
    }
  };

  return (
    <div>
      <DialogContent>
        <Grid container spacing={2}>
          <TextField
            // style={{ display: "none" }}
            label=""
            type="text"
            value={id}
            onChange={handleIdChange}
            fullWidth
          />
          {/* Tanggal Mulai */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate || ""}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>

          {/* Tanggal Berakhir */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate2 || ""}
              onChange={handleDateChange2}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>

          {/* Waktu Mulai */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Time 1"
              type="time"
              value={selectedTime1}
              onChange={handleTimeChange1}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>

          {/* Waktu Berakhir */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Time 2"
              type="time"
              value={selectedTime2}
              onChange={handleTimeChange2}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>

          {/* Judul Kegiatan */}
          <Grid item xs={12} sm={12}>
            <TextField
              label="Judul Kegiatan"
              type="text"
              value={judulKegiatan}
              onChange={handleJudulKegiatan}
              fullWidth
            />
          </Grid>

          {/* Nama Proyek (Dropdown) */}
          <Grid item xs={12} sm={12}>
            <TextField
              select
              label="Nama Proyek"
              value={selectedProyek}
              onChange={handleProyekChange}
              fullWidth
            >
              {proyekOptions.map((proyek) => (
                <MenuItem key={proyek.id} value={proyek.id}>
                  {proyek.nama_proyek}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Kembali
        </Button>
        <Button
          variant="contained"
          onClick={handleSimpan}
          disabled={!selectedProyek}
        >
          Simpan
        </Button>
      </DialogActions>
    </div>
  );
}

export default AddModalContent;
