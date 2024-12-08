"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import ProtectedRoute from "../components/protectedroute/protectedroute";

export default function SlotPropsSignUp() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Family_Name, setFamilyName] = useState("");
  const [Firma, setFirma] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState("password");
  const [message, setMessage] = useState("");
  const messageExist = useRef(null);
  const navigate = useRouter(); // useRouter innerhalb einer Page-Komponente

  async function handleRegister(e) {
    e.preventDefault();

    // Überprüfen, ob die Passwörter übereinstimmen
    if (Password !== ConfirmPassword) {
      setMessage("Passwörter stimmen nicht überein");
      return;
    }

    try {
      // Registrierungs-Request an die API
      const response = await axios.post("http://localhost:5000/register", {
        Name,
        Family_Name,
        Firma,
        Adresse,
        Password,
        Email,
      });

      setMessage(response.data.message);

      // Nach einer kurzen Verzögerung zur Login-Seite weiterleiten
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Ein Fehler ist aufgetreten");
    }
  }

  return (
    
    <div id="Main_Container_Registry">
      <div id="Registry_Container">
        <form id="Registry_Form" onSubmit={handleRegister}>
          <h1 id="Registry_Title">Registrierung</h1>

          {/* Formularfelder für die Registrierung */}
          <div className="Input_Container">
            <label htmlFor="Name">Vorname</label>
            <input
              className="input_registry"
              type="text"
              id="Name"
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="Family_Name">Nachname</label>
            <input
              className="input_registry"
              type="text"
              id="Family_Name"
              name="Family_Name"
              value={Family_Name}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="Firma">Firma</label>
            <input
              className="input_registry"
              type="text"
              id="Firma"
              name="Firma"
              value={Firma}
              onChange={(e) => setFirma(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="Adresse">Adresse</label>
            <input
              className="input_registry"
              type="text"
              id="Adresse"
              name="Adresse"
              value={Adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="Email">E-Mail</label>
            <input
              className="input_registry"
              type="email"
              id="Email"
              name="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="Password">Passwort</label>
            <input
              className="input_registry"
              type={ShowPassword}
              id="Password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <label htmlFor="ConfirmPassword">Passwort bestätigen</label>
            <input
              className="input_registry"
              type={ShowPassword}
              id="ConfirmPassword"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="Input_Container">
            <button id="Submit_Btn" type="submit">
              Registrieren
            </button>
          </div>

          <div id="LinkToLogin">
            <Link href={"/login"} style={{ color: "#1976d2" }}>
              Bereits registriert? Zum Login
            </Link>
          </div>

          {message && (
            <div id="error_message" ref={messageExist}>
              <p>{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}