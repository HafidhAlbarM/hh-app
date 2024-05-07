import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header() {
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Typography
          variant="h6"
          style={{ fontFamily: "Nunito, sans-serif", textAlign: "center" }}
        >
          <Typography
            variant="h6"
            display="inline"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Timesheet
          </Typography>{" "}
          <Typography
            variant="h6"
            display="block"
            style={{ color: "red", fontWeight: "bold" }}
          >
            Management
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
