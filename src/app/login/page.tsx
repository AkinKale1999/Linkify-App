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
import Cookies from "js-cookie";  // Importiere die js-cookie Bibliothek

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
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/login`,
        { username, password },
        { withCredentials: true }
      );

      const token = response.data.token;

      Cookies.set("authToken", token, { expires: 7 });

      if (response.status === 200) {
        router.push("/customer");
      } else {
        setErrorMessage("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("Ungültige Anmeldedaten.");
        } else if (error.response?.status === 500) {
          setErrorMessage("Serverfehler. Bitte später erneut versuchen.");
        } else {
          setErrorMessage(
            error.response?.data?.message || "Ein unbekannter Fehler ist aufgetreten."
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

      <Container maxWidth="sm" className="ContainerLogin">
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
              className="ContainerVisibility"

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

            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Button
                variant="text"
                color="secondary"
                style={{ width: "40%" }}
                onClick={handlePasswordReset}
              >
                Passwort vergessen?
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "60%", }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
