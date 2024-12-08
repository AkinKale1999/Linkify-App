"use client";

import React from "react";
import Link from "next/link"; // Verwende next/link anstelle von react-router-dom

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontSize: "1rem",
      }}
    >
      <h1 style={{ margin: "0", padding: "0" }}>404 - Seite nicht gefunden</h1>
      <p>Die angegebene URL existiert nicht.</p>
      <Link href="/login">Zurück zum Login</Link>{" "}
    </div>
  );
};

export default NotFoundPage;