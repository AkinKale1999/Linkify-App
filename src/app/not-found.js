"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importiere useRouter von next/router
import Link from "next/link"; // Verwende next/link anstelle von react-router-dom

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("Auth") === "true") {
      router.push("/"); // Leitet den Benutzer zur Startseite weiter, wenn er eingeloggt ist
    }
  }, [router]);

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
      <Link href="/login">Zurück zum Login</Link>
    </div>
  );
};

export default NotFoundPage;
