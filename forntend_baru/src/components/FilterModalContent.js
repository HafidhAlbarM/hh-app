import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function FilterModalContent({ handleClose, onFilterApply, onHapusFilter }) {
  const [selectedProyek, setSelectedProyek] = useState([]);
  const [selectedProyekName, setSelectedProyekName] = useState([]);
  const [proyekOptions, setProyekOptions] = useState([]);

  useEffect(() => {
    fetchProyekOptions();
  }, []);

  const fetchProyekOptions = () => {
    fetch("http://localhost:3001/api/proyek")
      .then((response) => response.json())
      .then((data) => {
        setProyekOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching proyek data:", error);
      });
  };

  const handleProyekChange = (event) => {
    const selectedIds = event.target.value;
    const previousSelectedIds = selectedProyek;
    const mergedSelectedIds = [...previousSelectedIds, ...selectedIds];
    const uniqueSelectedIds = Array.from(new Set(mergedSelectedIds));

    const filteredIdOnlyNumber = uniqueSelectedIds.filter((uniqueid) => {
      return !isNaN(uniqueid);
    });

    setSelectedProyek(filteredIdOnlyNumber);

    const selectedNames = proyekOptions
      .filter((proyek) => filteredIdOnlyNumber.includes(proyek.id))
      .map((proyek) => proyek.nama_proyek);

    setSelectedProyekName(selectedNames);
  };

  const handleFilterApply = () => {
    onFilterApply(selectedProyek);
    handleClose();
  };

  const handleHapusFilter = () => {
    setSelectedProyek([]);
    onHapusFilter();
  };

  return (
    <div>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="proyek-label">Pilih Proyek</InputLabel>
          <Select
            labelId="proyek-label"
            id="proyek"
            multiple
            value={selectedProyekName}
            onChange={handleProyekChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {proyekOptions.map((proyek) => (
              <MenuItem key={proyek.id} value={proyek.id}>
                {proyek.nama_proyek}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F0F6FF",
            color: "#F15858",
            marginTop: "10px",
            marginLeft: 10,
          }}
          onClick={handleHapusFilter}
        >
          Hapus Filter
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F15858",
            marginTop: "10px",
            marginLeft: 10,
          }}
          onClick={handleFilterApply}
        >
          Terapkan
        </Button>
      </DialogActions>
    </div>
  );
}

export default FilterModalContent;
