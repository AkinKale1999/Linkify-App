import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams(); // Holen der ID aus der URL
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
    navigate("/"); // Zurück zur Startseite nach dem Speichern
  };

  const handleDelete = () => {
    console.log("Benutzer gelöscht:", user);
    // Hier könnte eine API-Aufruf oder andere Logik zum Löschen des Benutzers hinzugefügt werden
    navigate("/"); // Nach dem Löschen zur Startseite navigieren
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            color: "#333",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          Edit User {user.id}
        </h1>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <label
              style={{
                textAlign: "left",
                fontSize: "14px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              First Name:
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>

            <label
              style={{
                textAlign: "left",
                fontSize: "14px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Last Name:
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>

            <label
              style={{
                textAlign: "left",
                fontSize: "14px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Age:
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "12px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                width: "48%",
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              style={{
                padding: "12px 20px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                width: "48%",
              }}
            >
              Delete User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
