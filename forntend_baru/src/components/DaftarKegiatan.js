import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

import AddModalContent from "./AddModalContent";
import FilterModalContent from "./FilterModalContent";

function DaftarKegiatan() {
  const [orderBy, setOrderBy] = useState("judul");
  const [order, setOrder] = useState("asc");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [kegiatanList, setKegiatanList] = useState([]);
  const [kegiatanData, setKegiatanData] = useState(null);

  useEffect(() => {
    ambilData();
  }, []);

  const ambilData = () => {
    fetch("http://localhost:3001/api/kegiatan")
      .then((response) => response.json())
      .then((data) => {
        // Simpan data kegiatan ke state kegiatanList
        setKegiatanList(data);
      })
      .catch((error) => {
        console.error("Error fetching kegiatan data:", error);
      });
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterButtonClick = () => {
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
  };

  const handleAddButtonClick = () => {
    setOpenAddModal(true);
    setKegiatanData(null);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleFilterApply = (selectedProyek) => {
    console.log("Filter diterapkan:", selectedProyek); // Ini adalah array

    console.log("Data kegiatan sebelum filter:", kegiatanList);

    const filteredKegiatan = kegiatanList.filter((kegiatan) => {
      return selectedProyek.includes(kegiatan.id_proyek);
    });

    console.log("Data kegiatan setelah filter:", filteredKegiatan);

    setKegiatanList(filteredKegiatan);
  };

  const handleHapusFilter = () => {
    ambilData();
    setOpenFilterModal(false);
  };

  const handleEditButtonClick = (id) => {
    console.log("edit id:", id);
    fetch(`http://localhost:3001/api/kegiatan/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpenAddModal(true);
        setKegiatanData(data);
      })
      .catch((error) => {
        console.error("Error fetching kegiatan data:", error);
      });
  };

  const handleDeleteButtonClick = (id) => {
    console.log("delete id:", id);

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/api/kegiatan/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Response from server:", data);
            ambilData();
            Swal.fire("Dihapus!", "Data telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error posting kegiatan data:", error);
          });
      }
    });
  };

  function hitungDurasi(
    tanggalMulai,
    waktuMulai,
    tanggalBerakhir,
    waktuBerakhir
  ) {
    const [tahunMulai, bulanMulai, hariMulai] = tanggalMulai.split("-");
    const [tahunBerakhir, bulanBerakhir, hariBerakhir] =
      tanggalBerakhir.split("-");
    const [jamMulai, menitMulai] = waktuMulai.split(":");
    const [jamBerakhir, menitBerakhir] = waktuBerakhir.split(":");

    const titikMulai = new Date(
      tahunMulai,
      bulanMulai - 1,
      hariMulai,
      jamMulai,
      menitMulai
    );
    const titikBerakhir = new Date(
      tahunBerakhir,
      bulanBerakhir - 1,
      hariBerakhir,
      jamBerakhir,
      menitBerakhir
    );

    const selisihMs = titikBerakhir - titikMulai;

    const selisihDetik = Math.floor(selisihMs / 1000);
    const jam = Math.floor(selisihDetik / 3600);
    const sisaDetik = selisihDetik % 3600;
    const menit = Math.floor(sisaDetik / 60);

    const durasi = `${jam} jam ${menit} menit`;

    return durasi;
  }

  const rows = kegiatanList;

  const sortedAndFilteredRows = rows

    .sort((a, b) => {
      const isAsc = order === "asc";
      if (a[orderBy] < b[orderBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    })

    .filter((row) =>
      Object.values(row).some(
        (value) =>
          value.toString().toLowerCase().indexOf(searchText.toLowerCase()) !==
          -1
      )
    );

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", float: "left" }}>
        <h2 style={{ marginRight: "auto" }}>Daftar Kegiatan</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F0F6FF",
            color: "#2775EC",
            marginTop: "10px",
            marginLeft: 10,
          }}
          onClick={handleAddButtonClick}
        >
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          Tambah Kegiatan
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", float: "right" }}>
        <TextField
          variant="outlined"
          placeholder="Cari"
          onChange={handleSearchChange}
        />
        <IconButton
          color="primary"
          style={{ color: "#F15858" }}
          onClick={handleFilterButtonClick}
        >
          <FilterListIcon />
        </IconButton>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "judul"}
                direction={orderBy === "judul" ? order : "asc"}
                onClick={() => handleSort("judul")}
              >
                Judul Kegiatan
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "proyek"}
                direction={orderBy === "proyek" ? order : "asc"}
                onClick={() => handleSort("proyek")}
              >
                Nama Proyek
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "tanggalMulai"}
                direction={orderBy === "tanggalMulai" ? order : "asc"}
                onClick={() => handleSort("tanggalMulai")}
              >
                Tanggal Mulai
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "tanggalBerakhir"}
                direction={orderBy === "tanggalBerakhir" ? order : "asc"}
                onClick={() => handleSort("tanggalBerakhir")}
              >
                Tanggal Berakhir
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "waktuMulai"}
                direction={orderBy === "waktuMulai" ? order : "asc"}
                onClick={() => handleSort("waktuMulai")}
              >
                Waktu Berakhir
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "waktuBerakhir"}
                direction={orderBy === "waktuBerakhir" ? order : "asc"}
                onClick={() => handleSort("waktuBerakhir")}
              >
                Waktu Berakhir
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "durasi"}
                direction={orderBy === "durasi" ? order : "asc"}
                onClick={() => handleSort("durasi")}
              >
                Durasi
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "aksi"}
                direction={orderBy === "aksi" ? order : "asc"}
                onClick={() => handleSort("aksi")}
              >
                Aksi
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAndFilteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.judul_kegiatan}</TableCell>
              <TableCell>{row.nama_proyek}</TableCell>
              <TableCell>{row.tanggal_mulai}</TableCell>
              <TableCell>{row.tanggal_berakhir}</TableCell>
              <TableCell>{row.waktu_mulai}</TableCell>
              <TableCell>{row.waktu_berakhir}</TableCell>
              <TableCell>
                {hitungDurasi(
                  row.tanggal_mulai,
                  row.waktu_mulai,
                  row.tanggal_berakhir,
                  row.waktu_berakhir
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  style={{ color: "#F15858" }}
                  onClick={() => handleEditButtonClick(row.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#F15858" }}
                  onClick={() => handleDeleteButtonClick(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              {/* Tambahkan sel untuk kolom lainnya */}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7} align="left">
              <strong>Total Durasi</strong>
            </TableCell>
            <TableCell>
              <strong>total Durasi</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={7} align="left">
              <strong>Total Pendapatan</strong>
            </TableCell>
            <TableCell>
              <strong> Rp.</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Modal filter */}
      <Dialog open={openFilterModal} onClose={handleCloseFilterModal}>
        <DialogTitle>Filter</DialogTitle>
        <FilterModalContent
          handleClose={handleCloseFilterModal}
          onFilterApply={handleFilterApply}
          onHapusFilter={handleHapusFilter}
        />{" "}
      </Dialog>

      {/* Modal Tambah */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="xl">
        <DialogTitle>Tambah/Edit Kegiatan</DialogTitle>
        <AddModalContent
          handleClose={handleCloseAddModal}
          ambilData={ambilData}
          kegiatanData={kegiatanData}
        />
      </Dialog>
    </div>
  );
}

export default DaftarKegiatan;
