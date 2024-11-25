import { Button } from "@mui/material";

export default function Cancelbutton({ ButtonText = "Cancel" }) {
  //  if (ButtonText === undefined) {
  //    ButtonText = defaultText;
  //  }
  // else{
  //   ButtonText = "Cancel20"
  // }

  // ButtonText = (ButtonText === undefined) ? "Cancel" : "Cancel20"

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--cancel-color)",
        color: "#fff",
        width: "var(--width-button)",
        height: "var(--height-button)",
      }}
    >
      {ButtonText}
    </Button>
  );
}
