import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BackButton({ ButtonText = "Back" }) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: "#fff",
        width: "var(--width-button)",
        height: "var(--height-button)",
      }}
      onClick={() => handleBack()}
    >
      {ButtonText}
    </Button>
  );
}
