import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cancelbutton from "../Buttons/CancelButton.jsx";
import Successbutton from "../Buttons/SuccessButton.jsx";
import MyTextField from "../User/MyTextField.jsx";
import BackButton from "../Buttons/BackButton.jsx";

const EditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

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
    const selectedUser = userData.find((user) => user.id === parseInt(id));
    if (!selectedUser) {
      navigate("/");
    } else {
      setUser(selectedUser);
    }
  }, [id, navigate]);

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
    navigate("/");
  };

  const handleDelete = () => {
    console.log("Benutzer gelöscht:", user);
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Div-Container">
      <MyTextField label="Firstname" value={user.firstName} />

      <MyTextField label="Lastname" value={user.lastName} />

      <MyTextField label="Age" value={user.age} />

      <Successbutton />

      <Cancelbutton />

      <BackButton />
    </div>
  );
};

export default EditPage;
