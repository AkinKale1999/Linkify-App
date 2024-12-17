"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("user@my.com");
  const [password, setPassword] = useState("1234");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegistrierung = () => {
    router.push("/registrierung");
  };

  const handlePasswordReset = () => {
    router.push("/password-vergessen");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Verhindert das Neuladen der Seite
    setErrorMessage(null); // Setzt vorherige Fehlermeldungen zurück

    try {
      const response = await axios.post(`${process.env.BaseURL}/login`, {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("user", response.data.token);
        router.push("/customer"); // Navigiert zum Dashboard oder einer anderen Seite
      } else {
        setErrorMessage(
          "Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Ungültige Anmeldedaten.");
        } else if (error.response?.status === 500) {
          setErrorMessage("Serverfehler. Bitte später erneut versuchen.");
        } else {
          setErrorMessage(
            error.response?.data?.message ||
              "Ein unbekannter Fehler ist aufgetreten."
          );
        }
      } else {
        setErrorMessage("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.");
      }
    }
  };

  return (
    <>
      <Button
        id="RegisterBtnOnLoginPage"
        sx={{ float: "right", marginTop: "10px", marginRight: "10px" }}
        variant="outlined"
        onClick={handleRegistrierung}
      >
        Registrierung
      </Button>

      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon className="VisibilityOFF" />
                      ) : (
                        <VisibilityIcon className="VisibilityONN" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && (
              <Typography
                color="error"
                variant="body2"
                style={{ marginTop: "8px" }}
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Login
            </Button>
          </form>
          <Button
            variant="text"
            color="secondary"
            style={{ marginTop: "16px" }}
            onClick={handlePasswordReset}
          >
            Passwort vergessen?
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
