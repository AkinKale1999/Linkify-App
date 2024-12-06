"use client"

import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewTableButton({ ButtonText = "View", id }) {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleEdit = (myid) => {
    navigate(`/Liste/${myid}`);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: theme.palette.mode === "dark" ? "#fff" : "#000", // Textfarbe abhängig vom Modus
      }}
      onClick={() => handleEdit(id)}
    >
      {ButtonText}
    </Button>
  );
}
