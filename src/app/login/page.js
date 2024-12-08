"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Router verwenden
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";

export default function SlotPropsSignIn() {
  // MUI-Theme erstellen
  const theme = createTheme();
  const router = useRouter(); // Router verwenden

  function ForgotPasswordLink() {
    return (
      <Link href="/PasswordVERGESSEN" style={{ color: "#1976d2" }}>
        Forgot password?
      </Link>
    );
  }

  function SignUpLink() {
    return (
      <Link href="/register" style={{ color: "#1976d2" }}>
        Noch kein Konto? Hier Registrieren
      </Link>
    );
  }

  const providers = [{ id: "credentials", name: "Email and Password" }];

  async function CheckLogin(email, password) {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("Auth", "true");
        sessionStorage.setItem("Username", email);
        router.push("/"); // Weiterleitung nach Login
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

    if (email === "akin@1" && password === "1234") {
      localStorage.setItem("Auth", "true");
      sessionStorage.setItem("Username", email);
      router.push("/"); // Weiterleitung nach erfolgreichem Login
    } else {
      CheckLogin(email, password);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "850px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
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
            }}
            providers={providers}
          />
        </AppProvider>
      </div>
    </ThemeProvider>
  );
}