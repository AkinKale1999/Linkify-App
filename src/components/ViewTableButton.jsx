import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewTableButton({ ButtonText = "View", id }) {
  const navigate = useNavigate();
  const handleEdit = (myid) => {
    navigate(`/edit/${myid}`);
    // alert(myid)
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: "#fff",
        // width: "var(--width-button)",
        // height: "var(--height-button)",
      }}
      onClick={() => handleEdit(id)}
    >
      {ButtonText}
    </Button>
  );
}
