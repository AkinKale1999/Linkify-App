"use client";

import React, { useState } from "react";
import axios from "axios";
import { NextPage } from "next";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.put("http://localhost:5000/api/passforgot", {
        email,
      });

      if (response.status === 200) {
        setSuccessMessage(
          "Eine E-Mail mit Anweisungen zum Zurücksetzen Ihres Passworts wurde gesendet."
        );
      } else if (response.status === 404) {
        setErrorMessage("Die eingegebene E-Mail-Adresse wurde nicht gefunden.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
        );
      }
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column",
      backgroundColor: "#f9f9f9",
      padding: "20px",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "1.5rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "0.9rem",
      color: "#555",
    },
    input: {
      width: "95%",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    successMessage: {
      backgroundColor: "#D4EDDA",
      color: "#155724",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "4px",
      textAlign: "center",
    },
    errorMessage: {
      backgroundColor: "#F8D7DA",
      color: "#721C24",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "4px",
      textAlign: "center",
    },
    // ---------------------------------------------
    loginLinkContainer: {
      marginTop: "20px",
      textAlign: "center",
    },

    loginLink: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      borderRadius: "4px",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "background-color 0.3s",
      cursor: "pointer",
    },

    loginLinkHover: {
      backgroundColor: "#0056b3", // Dunklerer Farbton für Hover-Effekt
    },
  };

  const router = useRouter();

  function handleLoginLinkClick() {
    router.push("/login");
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>Passwort vergessen</h1>

        {successMessage && (
          <div style={styles.successMessage}>{successMessage}</div>
        )}

        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

        <label htmlFor="email" style={styles.label}>
          E-Mail-Adresse
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Geben Sie Ihre E-Mail-Adresse ein"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          E-Mail senden
        </button>
      </form>

      <Button
        onClick={handleLoginLinkClick}
        variant="text"
        color="secondary"
        style={{ marginTop: "16px" }}
      >
        Zurück zum Login?
      </Button>
    </div>
  );
};

export default ForgotPassword;
