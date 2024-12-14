// app/login/page.tsx
"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios"; // Axios importieren

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("user@my.com");
  const [password, setPassword] = useState("1234");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Fehlernachricht-Status

  const handleRegistrierung = () => {
    router.push("/registrierung");
  };

  const handlePasswordReset = () => {
    router.push("/password-vergessen");
  };

  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setErrorMessage(null); 

  //   try {
  //     const response = await axios.post("http://localhost:3000/api/login", {
  //       username,
  //       password,
  //     });

  //     if (response.status === 200 && response.data.token) {
  //       localStorage.setItem("user", response.data.token);
  //       router.push("/customer");
  //     } else {
  //       setErrorMessage(
  //         "Ungültige Anmeldedaten. Bitte versuchen Sie es erneut."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Login fehlgeschlagen:", error);
  //     setErrorMessage(
  //       error.response?.data?.message || "Ein Fehler ist aufgetreten."
  //     );
  //   }
  // };

  return (
    <>
      <Button
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

          <form 
          // onSubmit={handleLogin}
          >
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              fullWidth
              margin="normal"
              variant="outlined"
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
