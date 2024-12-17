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
      const response = await axios.put(`${process.env.BaseURL}/user/passforgot`, {
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

  const router = useRouter();

  function handleLoginLinkClick() {
    router.push("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <form
        id="forgotPwdForm"
        onSubmit={handleSubmit}
        style={{
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px", // Maximale Breite für bessere Lesbarkeit
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Passwort vergessen
        </h1>

        {successMessage && (
          <div
            style={{
              color: "#155724",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "15px",
            }}
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              color: "#721c24",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "15px",
            }}
          >
            {errorMessage}
          </div>
        )}

        <label
          htmlFor="email"
          style={{
            display: "block",
            textAlign: "left",
            fontSize: "16px",
            marginBottom: "8px",
            color: "#000",
          }}
        >
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
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#1976d2",
          }}
        >
          E-Mail senden
        </button>
      </form>

      <Button
        onClick={handleLoginLinkClick}
        variant="text"
        color="secondary"
        style={{
          marginTop: "16px",
          textDecoration: "underline",
          fontSize: "16px",
        }}
      >
        Zurück zum Login?
      </Button>
    </div>
  );
};

export default ForgotPassword;
