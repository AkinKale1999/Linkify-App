"use client";
import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";

const ConfigPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<
    "email" | "dms" | "lexoffice" | null
  >(null);
  const [email, setEmail] = useState<string>("");
  const [dmsSetting, setDmsSetting] = useState<string>("");
  const [lexofficeSetting, setLexofficeSetting] = useState<string>("");

  const handleOpen = (type: "email" | "dms" | "lexoffice") => {
    setOpenModal(type);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  const handleSave = async () => {
    try {
      if (openModal === "email") {
        // Axios Anfrage für E-Mail
        await axios.post(`${process.env.BaseURL}/settings/email`, { email });
      } else if (openModal === "dms") {
        // Axios Anfrage für DMS
        await axios.post(`${process.env.BaseURL}/settings/dms`, { dms: dmsSetting });
      } else if (openModal === "lexoffice") {
        // Axios Anfrage für Lexoffice
        await axios.post(`${process.env.BaseURL}/settings/lexoffice`, {
          lexoffice: lexofficeSetting,
        });
      }

      handleClose(); // Schließt das Modal nach dem Speichern
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        style={{ textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          Einstellungen
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen("email")}
        >
          E-Mail anpassen
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpen("dms")}
        >
          DMS anpassen
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpen("lexoffice")}
        >
          Lexoffice anpassen
        </Button>
      </Box>

      {/* Modale Fenster */}
      <Modal open={openModal !== null} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {openModal === "email" && "E-Mail anpassen"}
            {openModal === "dms" && "DMS anpassen"}
            {openModal === "lexoffice" && "Lexoffice anpassen"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label={
              openModal === "email"
                ? "Neue E-Mail"
                : openModal === "dms"
                  ? "DMS-Einstellung"
                  : "Lexoffice-Einstellung"
            }
            value={
              openModal === "email"
                ? email
                : openModal === "dms"
                  ? dmsSetting
                  : lexofficeSetting
            }
            onChange={(e) =>
              openModal === "email"
                ? setEmail(e.target.value)
                : openModal === "dms"
                  ? setDmsSetting(e.target.value)
                  : setLexofficeSetting(e.target.value)
            }
          />
          <Box display="flex" justifyContent="space-between" marginTop="16px">
            <Button variant="outlined" onClick={handleClose}>
              Abbrechen
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Speichern
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ConfigPage;
