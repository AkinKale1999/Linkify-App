"use client";
import React, { useState } from "react";
import {Container, TextField, Button, Box, Typography,Grid,} from "@mui/material";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      alert("Password stimmen nicht überein.");
      return;
    }

    try {
      const response = "success";
      if (response) {
        router.push("/dashboard");
        alert("Registration Erfolgreich, sie werden weitergeleitet zu ihrem Dashboard");
      }
    } catch (error) {
      alert("Es ist ein Problem beim Registrieren.");
    }
  };

  const handleLogin = async () => {
    router.push("/");
  };

  return (
    <>
      <Button sx={{ float: "right" }} variant="outlined" onClick={handleLogin}>
        Login
      </Button>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minWidth="100%"
          minHeight="100vh"
        >
          <Box
            sx={{ marginTop: "200px" }}
            component="form"
            onSubmit={handleRegister}
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
          >
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Register
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vorname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nachname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Adresse"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Firma"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password bestätigen"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
