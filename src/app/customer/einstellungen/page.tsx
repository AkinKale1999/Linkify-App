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
        await axios.post(`${process.env.NEXT_PUBLICE_BaseURL}/settings/email`, {
          email,
        });
      } else if (openModal === "dms") {
        // Axios Anfrage für DMS
        await axios.post(`${process.env.NEXT_PUBLICE_BaseURL}/settings/dms`, {
          dms: dmsSetting,
        });
      } else if (openModal === "lexoffice") {
        // Axios Anfrage für Lexoffice
        await axios.post(
          `${process.env.NEXT_PUBLICE_BaseURL}/settings/lexoffice`,
          {
            lexoffice: lexofficeSetting,
          }
        );
      }

      handleClose(); // Schließt das Modal nach dem Speichern
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <Container className="ContainerConfigPage" maxWidth="sm">
      <Box className="BoxConfigPage" gap={2}>
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
        <Box className="modalConfigPage">
          <Typography variant="h6" gutterBottom color="black">
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
