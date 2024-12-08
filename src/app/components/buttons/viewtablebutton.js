"use client"; // Markiert die Datei als Client-Komponente

import { Button, useTheme } from "@mui/material";
import { useState } from "react";
import EditPage from "../editpage/editpage";

export default function ViewTableButton({ row }) {
  const [view, setView] = useState(false);

  const theme = useTheme();

  const handleClick = () => {
    setView(true);
  };

  return (
    <>
      <Button
        variant="contained"
        style={{
          backgroundColor: "var(--success-color)",
          color: theme.palette.mode === "dark" ? "#fff" : "#000", // Textfarbe abhängig vom Modus
        }}
        onClick={handleClick}  // Ändert die Ansicht ohne URL zu verändern
      >
        View
      </Button>
      {view && <EditPage selectedRowId={row.id} />}
    </>
  );
}