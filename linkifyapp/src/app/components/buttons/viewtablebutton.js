"use client";  // Stelle sicher, dass dies oben in der Datei steht

import { Button, useTheme } from "@mui/material";
import { useRouter } from "next/router";  // Verwende useRouter aus next/router

export default function ViewTableButton({ ButtonText = "View", id }) {
  const router = useRouter();  // useRouter Hook von Next.js

  const theme = useTheme();

  const handleEdit = (myid) => {
    router.push(`/Liste/${myid}`);  // Navigiere mit router.push
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: theme.palette.mode === "dark" ? "#fff" : "#000", // Textfarbe abhängig vom Modus
      }}
      onClick={() => handleEdit(id)}  // Navigiere beim Klick auf den Button
    >
      {ButtonText}
    </Button>
  );
}
