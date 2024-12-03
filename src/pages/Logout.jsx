import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "98vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Auf Wiedersehen!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Wir hoffen, Sie bald wiederzusehen. Um auf Ihr Dashboard zuzugreifen,
        melden Sie sich bitte erneut an.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3}}
        onClick={handleLoginRedirect}
      >
        Zum Login
      </Button>
    </Box>
  );
}
