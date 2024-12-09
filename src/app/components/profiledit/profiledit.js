import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Avatar } from "@mui/material";

function ProfilePage() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "", // Vorname
    lastName: "",  // Nachname
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    address: "", // Neues Feld für Adresse
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedEmail = localStorage.getItem("email");
    const storedCompany = localStorage.getItem("company");
    const storedPassword = localStorage.getItem("password");
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedAddress = localStorage.getItem("address"); // Adresse aus localStorage holen

    if (storedFirstName && storedLastName && storedEmail && storedCompany && storedPassword) {
      setUserData({
        firstName: storedFirstName,
        lastName: storedLastName,
        email: storedEmail,
        company: storedCompany,
        password: storedPassword,
        confirmPassword: storedPassword,
        profileImage: storedProfileImage || "",
        address: storedAddress || "", // Adresse setzen
      });
      setImagePreview(storedProfileImage);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "password") {
        if (validatePassword(updatedData.password)) {
          setErrorMessage("");
        }
      }

      const isEmpty = Object.values(updatedData).some((val) => val === "");
      if (!isEmpty) {
        setErrorMessage("");
      }

      return updatedData;
    });
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\~-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSaveChanges = async () => {
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.company ||
      !userData.password ||
      !userData.confirmPassword ||
      !userData.address // Überprüfen, ob die Adresse eingegeben wurde
    ) {
      setErrorMessage("Alle Felder müssen ausgefüllt werden.");
      return;
    }

    if (!validatePassword(userData.password)) {
      setErrorMessage(
        "Das Passwort muss mindestens 8 Zeichen lang sein und 1 Großbuchstaben, 1 Kleinbuchstaben, 1 Zahl sowie 1 Sonderzeichen enthalten."
      );
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/updateProfile",
        userData
      );

      if (response.status === 200) {
        alert("Änderungen wurden gespeichert.");
        router.push("/dashboard");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setUserData((prevData) => ({
          ...prevData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setUserData((prevData) => ({
      ...prevData,
      profileImage: "",
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5">Profil bearbeiten</Typography>

      {errorMessage && (
        <Alert
          style={{ marginBottom: "20px", marginTop: "10px" }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Avatar
          src={imagePreview || userData.profileImage || "/default-profile.png"}
          alt="Profilbild"
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
          }}
        />
      </Box>

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
        label="Vorname"
        name="firstName"
        value={userData.firstName}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nachname"
        name="lastName"
        value={userData.lastName}
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
        label="Adresse"
        name="address"
        value={userData.address}
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
        name="confirmPassword"
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
