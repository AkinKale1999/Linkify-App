import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ViewTableButton({ ButtonText = "View", id }) {
  const navigate = useNavigate();
  const handleEdit = (myid) => {
    navigate(`/Liste/edit/${myid}`);
    // alert(myid)
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
      }}
      onClick={() => handleEdit(id)}
    >
      {ButtonText}
    </Button>
  );
}
