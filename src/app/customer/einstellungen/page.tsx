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
import EuroIcon from "@mui/icons-material/Euro";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

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
        await axios.post(`${process.env.NEXT_PUBLIC_BaseURL}/settings/email`, {
          email,
        });
      } else if (openModal === "dms") {
        await axios.post(`${process.env.NEXT_PUBLIC_BaseURL}/settings/dms`, {
          dms: dmsSetting,
        });
      } else if (openModal === "lexoffice") {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BaseURL}/settings/lexoffice`,
          {
            lexoffice: lexofficeSetting,
          }
        );
      }

      handleClose();
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  const router = useRouter();

  function handleClickOnProfile() {
    router.push("/customer/profil");
  }

  return (
    <Container className="ContainerConfigPage" maxWidth="sm">
      <Box className="BoxConfigPage">
        <Typography variant="h4" gutterBottom>
          Einstellungen
        </Typography>

        {/* Email Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen("email")}
          className="ConfigPageButton"
        >
          <Box className="BoxConfigPageButtonIcon">
            <EmailIcon className="ConfigPageButtonIcon" />
            <p className="ConfigPageFont">E-Mail anpassen</p>
          </Box>
        </Button>

        {/* DMS Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpen("dms")}
          className="ConfigPageButton"
        >
          <Box className="BoxConfigPageButtonIcon">
            <FilePresentIcon className="ConfigPageButtonIcon" />
            <p className="ConfigPageFont">DMS anpassen</p>
          </Box>
        </Button>

        {/* Lexoffice Button */}
        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpen("lexoffice")}
          className="ConfigPageButton"
        >
          <Box className="BoxConfigPageButtonIcon">
            <EuroIcon className="ConfigPageButtonIcon" />
            <p className="ConfigPageFont">Lexoffice anpassen</p>
          </Box>
        </Button>

        {/* Profil Button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleClickOnProfile()}
          className="ConfigPageButton"
        >
          <Box className="BoxConfigPageButtonIcon">
            <AccountCircleIcon className="ConfigPageButtonIcon" />
            <p className="ConfigPageFont">Profil anpassen</p>
          </Box>
        </Button>
      </Box>

      {/* Modal */}
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
