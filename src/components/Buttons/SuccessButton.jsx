import { Button } from "@mui/material";

export default function Successbutton({ ButtonText = "Success" }) {
  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: "#fff",
        width: "var(--width-button)",
        height: "var(--height-button)",
      }}
    >
      {ButtonText}
    </Button>
  );
}
