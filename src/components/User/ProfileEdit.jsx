import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios"; // Importiere axios
import { Avatar } from "@mui/material"; // Avatar für das Profilbild

function ProfilePage() {
  const navigate = useNavigate();

  // Benutzerdaten aus dem LocalStorage holen
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "", // Neues Feld für Passwortbestätigung
    profileImage: "", // Neues Feld für das Profilbild
  });

  const [errorMessage, setErrorMessage] = useState(""); // State für Fehlermeldung
  const [imagePreview, setImagePreview] = useState(null); // State für Bildvorschau

  useEffect(() => {
    // Daten aus LocalStorage laden
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedCompany = localStorage.getItem("company");
    const storedPassword = localStorage.getItem("password");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedUsername && storedEmail && storedCompany && storedPassword) {
      setUserData({
        username: storedUsername,
        email: storedEmail,
        company: storedCompany,
        password: storedPassword,
        confirmPassword: storedPassword, // Setze das bestätigte Passwort zu dem gespeicherten Passwort
        profileImage: storedProfileImage || "", // Setze das gespeicherte Profilbild
      });
      setImagePreview(storedProfileImage); // Setze die Bildvorschau
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Überprüfe, ob das Passwort den Anforderungen entspricht und setze die Fehlermeldung zurück
      if (name === "password") {
        if (validatePassword(updatedData.password)) {
          setErrorMessage(""); // Fehlermeldung löschen, wenn das Passwort korrekt ist
        }
      }

      // Überprüfen, ob alle Felder ausgefüllt sind und setze ggf. die Fehlermeldung zurück
      const isEmpty = Object.values(updatedData).some((val) => val === "");
      if (!isEmpty) {
        setErrorMessage(""); // Wenn alle Felder ausgefüllt sind, Fehlermeldung entfernen
      }

      return updatedData;
    });
  };

  // Funktion zur Passwortvalidierung
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\~-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSaveChanges = async () => {
    // Validierung: Prüfen, ob alle Felder ausgefüllt sind (optional, um Fehler anzuzeigen, aber nicht das PUT zu verhindern)
    if (
      !userData.username ||
      !userData.email ||
      !userData.company ||
      !userData.password ||
      !userData.confirmPassword // Sicherstellen, dass das Bestätigungspasswort ausgefüllt ist
    ) {
      setErrorMessage("Alle Felder müssen ausgefüllt werden."); // Setze Fehlermeldung
      return; // Verhindert das Speichern, wenn Felder leer sind
    }

    // Validierung des Passworts
    if (!validatePassword(userData.password)) {
      setErrorMessage(
        "Das Passwort muss mindestens 8 Zeichen lang sein und 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl sowie 1 Sonderzeichen enthalten."
      );
      return;
    }

    // Validierung: Prüfen, ob die Passwörter übereinstimmen
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      // HTTP-Anfrage an das Backend, um die Benutzerdaten zu aktualisieren
      const response = await axios.put(
        "http://localhost:5000/api/updateProfile",
        userData
      );

      if (response.status === 200) {
        alert("Änderungen wurden gespeichert.");
        navigate("/Dashboard");
      } else {
        setErrorMessage(
          "Etwas ist schief gelaufen. Bitte versuche es später erneut."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Fehler beim Speichern der Änderungen. Versuche es später erneut."
      );
      console.error("Error saving profile data", error);
    }
  };

  // Funktion zum Umgang mit dem Profilbild-Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Zeigt das ausgewählte Bild als Vorschau an
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result, // Das Bild in den Benutzerdaten speichern
        }));
      };
      reader.readAsDataURL(file); // Bild in Base64-Format konvertieren
    }
  };

  // Funktion zum Entfernen des Profilbildes
  const handleRemoveImage = () => {
    setImagePreview(null); // Setzt die Bildvorschau zurück
    setUserData((prevData) => ({
      ...prevData,
      profileImage: "", // Entfernt das Bild aus den Benutzerdaten
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">Profil bearbeiten</Typography>

      {/* Fehlermeldung anzeigen */}
      {errorMessage && (
        <Alert
          style={{ marginBottom: "20px", marginTop: "10px" }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}

      {/* Profilbild */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Avatar
          src={imagePreview || userData.profileImage || "/default-profile.png"}
          alt="Profilbild"
          sx={{
            width: 200, // Größe des Bildes
            height: 200, // Größe des Bildes
            borderRadius: "50%", // Rundes Bild
          }}
        />
      </Box>

      {/* Profilbild hochladen */}
      <Button
        variant="outlined"
        component="label"
        sx={{ marginBottom: 2, display: "flex", padding: 2 }}
      >
        Profilbild auswählen
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>

      {/* Profilbild entfernen */}
      {imagePreview && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRemoveImage}
          sx={{
            marginBottom: 2,
            display: "flex",
            padding: 2,
            marginTop: 4,
            width: "100%",
          }}
        >
          Profilbild entfernen
        </Button>
      )}

      <TextField
        label="Benutzername"
        name="username"
        value={userData.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="E-Mail"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Firma"
        name="company"
        value={userData.company}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Passwort"
        type="password"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Passwort bestätigen"
        type="password"
        name="confirmPassword" // Neues Feld für Passwortbestätigung
        value={userData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <Button
        onClick={handleSaveChanges}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Änderungen speichern
      </Button>
    </Box>
  );
}

export default ProfilePage;
