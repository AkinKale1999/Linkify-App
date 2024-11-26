import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewTableButton({ ButtonText = "View", id }) {
  const navigate = useNavigate();

  // Access the current theme
  const theme = useTheme();

  // Handle navigation
  const handleEdit = (myid) => {
    navigate(`/Liste/edit/${myid}`);
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
