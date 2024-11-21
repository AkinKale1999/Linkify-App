import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function SlotPropsSignUp() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSignIn = (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // Beispiel für eine einfache Prüfung
    if (email === "akin@1" && password === "1234") {
        localStorage.setItem("isAuthenticated", "true");
        console.log(localStorage.setItem)
      navigate("/Dashboard");
    } else {
      localStorage.setItem("isAuthenticated", "false");
      alert("Falsche Anmelde Daten.");
      navigate("/Login");
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleSignIn}
        slotProps={{
          emailField: { variant: "standard" },
          passwordField: { variant: "standard" },
          submitButton: { variant: "outlined" },
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
