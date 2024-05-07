import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Pengaturan({ namaKaryawan, rate }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Box sx={{ width: "300px", textAlign: "left" }}>
        <TextField
          id="namaKaryawan"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={namaKaryawan}
        />
        <TextField
          id="rate"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={rate}
        />
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ marginRight: 1 }}
            style={{
              backgroundColor: "#F0F6FF",
              color: "#2775EC",
              marginTop: "10px",
              marginLeft: 10,
            }}
          >
            Batalkan
          </Button>
          <Button
            variant="contained"
            style={{
              color: "#F0F6FF",
              marginTop: "10px",
              marginLeft: 10,
            }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Pengaturan;
