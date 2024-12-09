"use client"; // Markiert die Datei als Client-Komponente

import { Button, useTheme } from "@mui/material";
import { useRouter } from "next/navigation"; // Importiere den useRouter-Hook

export default function ViewTableButton({ row }) {
  const theme = useTheme();
  const router = useRouter(); // Initialisiere den Router

  const handleClick = () => {
    // Navigiere zu der Edit-Seite und übergebe die ID des ausgewählten Eintrags
    router.push(`/editpage/${row.id}`);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: theme.palette.mode === "dark" ? "#fff" : "#000", // Textfarbe abhängig vom Modus
      }}
      onClick={handleClick} // Leite bei Klick zur Edit-Seite weiter
    >
      View
    </Button>
  );
}
