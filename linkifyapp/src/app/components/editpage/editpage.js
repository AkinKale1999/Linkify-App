"use client"; // Markiert die Datei als Client-Komponente

import React, { useState, useEffect } from "react";
import MyTextField from "../mytextfield/page.js";
import Successbutton from "../buttons/successbutton.js";
import Cancelbutton from "../buttons/cancelbutton.js";
import BackButton from "../buttons/backbutton.js";

const EditPage = ({ selectedRowId }) => {
  const [user, setUser] = useState(null);

  const userData = [
    {
      id: 1,
      lastName: "LastName1",
      firstName: "FirstName1",
      age: 35,
      status: false,
    },
    {
      id: 2,
      lastName: "LastName2",
      firstName: "FirstName2",
      age: 42,
      status: false,
    },
    {
      id: 3,
      lastName: "LastName3",
      firstName: "FirstName3",
      age: 45,
      status: false,
    },
    {
      id: 4,
      lastName: "LastName4",
      firstName: "FirstName4",
      age: 16,
      status: false,
    },
    {
      id: 5,
      lastName: "LastName5",
      firstName: "FirstName5",
      age: 25,
      status: false,
    },
    {
      id: 6,
      lastName: "LastName6",
      firstName: "FirstName6",
      age: 150,
      status: false,
    },
    {
      id: 7,
      lastName: "LastName7",
      firstName: "FirstName7",
      age: 44,
      status: false,
    },
    {
      id: 8,
      lastName: "LastName8",
      firstName: "FirstName8",
      age: 36,
      status: false,
    },
    {
      id: 9,
      lastName: "LastName9",
      firstName: "FirstName9",
      age: 65,
      status: false,
    },
  ];

  useEffect(() => {
    const selectedUser = userData.find((user) => user.id === selectedRowId);
    setUser(selectedUser);
  }, [selectedRowId]);

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
      <MyTextField label="Firstname" value={user.firstName} onChange={handleChange} name="firstName" />

      <MyTextField label="Lastname" value={user.lastName} onChange={handleChange} name="lastName" />

      <MyTextField label="Age" value={user.age} onChange={handleChange} name="age" />

      <Successbutton onClick={handleSubmit} />
      <Cancelbutton onClick={() => setUser(null)} />
      <BackButton onClick={() => setUser(null)} />
    </div>
  );
};

export default EditPage;
