"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

// Interface für das Formular-Datenobjekt
interface FormData {
  username: string;
  companyName: string;
  name: string;
  firstName: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  addressAdditional: string;
  licenseValidity: string; // Lizenz Gültigkeit
  group: string; // Gruppe
  id: string; // ID, wird hidden
}

export default function Profile() {
  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const fieldsetStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
  };

  const legendStyle = {
    padding: "0 5px",
    fontWeight: "bold",
    color: "#000",
  };

  const [formData, setFormData] = useState<FormData>({
    username: "",
    companyName: "",
    name: "",
    firstName: "",
    street: "",
    postalCode: "",
    city: "",
    region: "",
    country: "",
    addressAdditional: "",
    licenseValidity: "",
    group: "",
    id: "", // ID bleibt hidden
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BaseURL}/user/profile`);
        setFormData(response.data); // Setze die erhaltenen Daten in den Zustand
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // -------------------------------
    // fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.BaseURL}/user/profile`,
        formData
      );
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!/^[A-Za-z]+$/.test(e.currentTarget.value)) {
      e.preventDefault();
    }
  };

  const handlePostalCodeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!/^[0-9]+$/.test(e.currentTarget.value)) {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "80%",
        height: "950px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: "-50px",
        fontWeight: "bold",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          backgroundColor: "#f9f9f9",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "50%",
          justifyContent: "center",
          alignContent: "center",
          color: "#000",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0", color: "#000" }}>
          Profile
        </h1>
        {/* Benutzer Section */}
        <div>
          <label style={{ color: "#000" }}>* Benutzer:</label>
          <input
            type="text"
            name="username"
            placeholder="Benutzername"
            required
            style={inputStyle}
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Rechnungsadresse Section */}
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>+ Rechnungsadresse</legend>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              name="companyName"
              placeholder="Firmenname"
              style={inputStyle}
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              style={inputStyle}
              value={formData.name}
              onChange={handleInputChange}
              onInput={handleNameInput}
            />
            <input
              type="text"
              name="firstName"
              placeholder="Vorname"
              required
              style={inputStyle}
              value={formData.firstName}
              onChange={handleInputChange}
              onInput={handleNameInput}
            />
            <input
              type="text"
              name="street"
              placeholder="Straße und Hausnummer"
              required
              style={inputStyle}
              value={formData.street}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postleitzahl"
              required
              style={inputStyle}
              value={formData.postalCode}
              onChange={handleInputChange}
              onInput={handlePostalCodeInput}
            />
            <input
              type="text"
              name="city"
              placeholder="Ort"
              required
              style={inputStyle}
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="region"
              placeholder="Region"
              style={inputStyle}
              value={formData.region}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Land"
              required
              style={inputStyle}
              value={formData.country}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="addressAdditional"
              placeholder="Adresszusatz"
              style={inputStyle}
              value={formData.addressAdditional}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        {/* Firmenname Section */}
        <div>
          <label style={{ color: "#000" }}>+ Firmenname:</label>
          <input
            type="text"
            name="companyName"
            placeholder="Firmenname"
            style={inputStyle}
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        {/* Lizenz Gültigkeit Section (optional) */}
        <div>
          <label style={{ color: "#000" }}>- Lizenz Gültigkeit</label>
          <input
            type="text"
            name="licenseValidity"
            placeholder="Lizenz Gültigkeit"
            style={inputStyle}
            value={formData.licenseValidity}
            onChange={handleInputChange}
          />
        </div>

        {/* Gruppe Section */}
        <div>
          <label style={{ color: "#000" }}>- Gruppe</label>
          <input
            type="text"
            name="group"
            placeholder="Gruppe"
            style={inputStyle}
            value={formData.group}
            onChange={handleInputChange}
          />
        </div>

        {/* ID (Hidden, nicht im Formular anzeigen) */}
        <input
          type="hidden"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
