"use client"; // Markiert die Datei als Client-Komponente

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Statt 'useParams' und 'useNavigate'
import Cancelbutton from "../components/buttons/cancelbutton";
import Successbutton from "../components/buttons/successbutton.js";
import MyTextField from "../mytextfield/page";
import BackButton from "../components/buttons/backbutton.js";

const EditPage = () => {
  const { query } = useRouter(); // Verwendung von Next.js 'useRouter'
  const { id } = query; 
  const router = useRouter();

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return; // Warten bis 'id' in der URL verfügbar ist
    const selectedUser = userData.find((user) => user.id === parseInt(id));
    if (!selectedUser) {
      router.push("/"); // Weiterleitung falls kein Benutzer gefunden
    } else {
      setUser(selectedUser);
    }
  }, [id, router]);

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
    router.push("/"); // Weiterleitung nach dem Absenden
  };

  const handleDelete = () => {
    console.log("Benutzer gelöscht:", user);
    router.push("/"); // Weiterleitung nach der Löschung
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

      <Cancelbutton onClick={() => router.push("/")} />

      <BackButton onClick={() => router.push("/")} />
    </div>
  );
};

export default EditPage;
