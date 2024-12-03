import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTheme } from "@mui/material/styles";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SlotPropsSignUp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    vorname: "",
    firma: "",
    adresse: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const field in formData) {
      if (formData[field] === "") {
        alert(`Bitte füllen Sie das Feld ${field} aus.`);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwörter stimmen nicht überein");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/Register", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        vorname: formData.vorname,
        firma: formData.firma,
        adresse: formData.adresse,
      });

      if (response.status === 200) {
        alert(
          "Registrierung erfolgreich!, Sie werden Zur Login Seite weitergeleitet"
        );
        navigate("/login");
      } else {
        alert("Fehler bei der Registrierung. Versuche es erneut.");
      }
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error);
      alert("Ein Fehler ist aufgetreten. Versuche es später erneut.");
    }
  };

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: "400px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Registrierung
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-Mail"
            name="email"
            type="email"
            variant="standard"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Name"
            name="name"
            type="text"
            variant="standard"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Vorname"
            name="vorname"
            type="text"
            variant="standard"
            fullWidth
            value={formData.vorname}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Firma"
            name="firma"
            type="text"
            variant="standard"
            fullWidth
            value={formData.firma}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Adresse"
            name="adresse"
            type="text"
            variant="standard"
            fullWidth
            value={formData.adresse}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Passwort"
            name="password"
            type="password"
            variant="standard"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Passwort bestätigen"
            name="confirmPassword"
            type="password"
            variant="standard"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            sx={{ padding: 1 }}
          >
            Registrieren
          </Button>
        </form>
      </Box>
    </AppProvider>
  );
}
