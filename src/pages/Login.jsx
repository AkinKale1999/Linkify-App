import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SlotPropsSignIn() {

  function ForgotPasswordLink() {
    return (
      <Link to="/PasswordVERGESSEN" style={{ color: "#1976d2" }}>
        Forgot password?
      </Link>
    );
  }

  function SignUpLink() {
    return (
      <Link to="/register" style={{ color: "#1976d2" }}>
        Noch kein Konto? Hier Registrieren
      </Link>
    );
  }

  const providers = [{ id: "credentials", name: "Email and Password" }];
  const theme = useTheme();

  // Funktion zur Authentifizierung mit dem Backend
  async function CheckLogin(email, password) {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem("Auth", "true");
        sessionStorage.setItem("Username", email);
        window.location.href = "/";
      } else {
        alert("Falsche Anmeldedaten.");
      }
    } catch (error) {
      console.error("Fehler beim Login:", error);
      alert("Ein Fehler ist aufgetreten.");
    }
  }

  const handleSignIn = (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // Überprüfe zuerst die Anmeldedaten lokal
    if (email === "akin@1" && password === "1234") {
      localStorage.setItem("Auth", "true");
      sessionStorage.setItem("Username", email);
      window.location.href = "/";
    } else {
      CheckLogin(email, password);
    }
  };

  return (
    <div style={{ height: "800px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <AppProvider theme={theme}>
        <SignInPage
          slots={{
            signUpLink: SignUpLink,
            forgotPasswordLink: ForgotPasswordLink,
          }}
          signIn={handleSignIn}
          slotProps={{
            emailField: { variant: "standard" },
            passwordField: { variant: "standard" },
            submitButton: { variant: "outlined" },
          }} providers={providers}
        />
      </AppProvider>
    </div>
  );
}
