"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/protectedroute/protectedroute";

export default function Logout() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Setze den Zustand auf true, wenn der Code im Client läuft
    setIsClient(true);
  }, []);

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (!isClient) {
    return null;  // Verhindert das Rendern auf dem Server
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "98vh",
        textAlign: "center",
        backgroundColor: "#fff",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Auf Wiedersehen!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Wir hoffen, Sie bald wiederzusehen. Um auf Ihr Dashboard zuzugreifen,
        melden Sie sich bitte erneut an.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleLoginRedirect}
      >
        Zum Login
      </Button>
    </Box>
  );
}