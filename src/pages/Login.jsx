import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function SlotPropsSignIn() {
  const navigate = useNavigate();
  
  const providers = [{ id: "credentials", name: "Email and Password" }];

  const theme = useTheme();

  const handleSignIn = (provider, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "akin@1" && password === "1234") {
      localStorage.setItem("Auth", "true");
      sessionStorage.setItem("Username", email);
      navigate("/dashboard");
    } else {
      alert("Falsche Anmeldedaten.");
      return;
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
