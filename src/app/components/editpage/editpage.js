"use client"; // Markiert die Datei als Client-Komponente

import React, { useState, useEffect } from "react";
import MyTextField from "../mytextfield/page.js";
import Successbutton from "../buttons/successbutton.js";
import Cancelbutton from "../buttons/cancelbutton.js";
import BackButton from "../buttons/backbutton.js";

const EditPage = ({ selectedRowId }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const selectedUser = user.find((user) => user.id === selectedRowId);
  //   setUser(selectedUser);
  // }, [selectedRowId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Benutzerdaten geändert:", user);
  };

  const handleDelete = () => {
    console.log("Benutzer gelöscht:", user);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Div-Container">
      <MyTextField
        label="Firstname"
        value={user.firstName}
        onChange={handleChange}
        name="firstName"
      />

      <MyTextField
        label="Lastname"
        value={user.lastName}
        onChange={handleChange}
        name="lastName"
      />

      <MyTextField
        label="Age"
        value={user.age}
        onChange={handleChange}
        name="age"
      />

      <Successbutton onClick={handleSubmit} />
      <Cancelbutton onClick={() => setUser(null)} />
      <BackButton onClick={() => setUser(null)} />
    </div>
  );
};

export default EditPage;