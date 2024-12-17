import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation"; // Für URL-Parameter und Router
import axios from "axios"; // Axios importieren
import usersData from "../userdata.json"; // JSON-Datei importieren
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../../globals.css";

type User = {
  id: number;
  username: string;
  group: string;
  name: {
    first_name: string;
    last_name: string;
  };
  status: string;
};

const UserDetail: React.FC = () => {
  const { id } = useParams(); // ID aus der URL auslesen
  const router = useRouter();

  // Den Benutzer aus der JSON-Datei finden
  const user = usersData.users.find((user: User) => user.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(user || null);
  const [error, setError] = useState<string>("");

  // Falls kein Benutzer gefunden wurde
  if (!user) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Kein Benutzer mit der ID {id} gefunden.</h3>
      </div>
    );
  }

  // Funktion zum Bearbeiten der Benutzerdaten
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [name]: value,
      });
    }
  };

  // Validierung der Benutzereingaben
  const validateInputs = () => {
    if (
      !updatedUser?.username ||
      !updatedUser?.group ||
      !updatedUser?.name.first_name ||
      !updatedUser?.name.last_name ||
      !updatedUser?.status
    ) {
      setError("Alle Felder müssen ausgefüllt werden.");
      return false;
    }
    setError(""); // Fehler zurücksetzen, wenn alles korrekt ist
    return true;
  };

  // Funktion zum Speichern der bearbeiteten Daten mit Axios
  const handleSaveChanges = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.put(
          `${process.env.BaseURL}/user/${updatedUser?.id}`,
          updatedUser
        );
        if (response.status === 200) {
          console.log("Benutzerdaten gespeichert:", updatedUser);
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Fehler beim Speichern:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.BaseURL}/user/${updatedUser?.id}`
      );
      if (response.status === 200) {
        console.log("Benutzer gelöscht:", updatedUser);
        router.push("/users");
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  const [modalTextColor, setModalTextColor] = useState("black");

  useEffect(() => {
    const bodyBackgroundColor = window.getComputedStyle(
      document.body
    ).backgroundColor;
    if (bodyBackgroundColor === "rgb(0, 0, 0)") {
      setModalTextColor("black");
    } else {
      setModalTextColor("black");
    }
  }, [isEditing]);

  function handleGoingBack() {
    router.back();
  }

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        marginBottom: "70px",
        marginTop: "70px",
      }}
    >
      <h3>Benutzer Details</h3>

      <table
        style={{
          margin: "0",
          borderCollapse: "collapse",
          width: "80%",
          textAlign: "left",
          position: "relative",
          left: "12%",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th
              className="UserDetailTableHeader"
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                width: "50%",
              }}
            >
              Feld
            </th>
            <th
              className="UserDetailTableHeader"
              style={{ padding: "10px", border: "1px solid #ddd" }}
            >
              Wert
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>ID</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.id}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Benutzername
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.username}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Gruppe
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.group}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Vorname
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.name.first_name}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Nachname
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.name.last_name}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Status
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {user.status}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "10px",
        }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            transform: "scale(1.3)",
          }}
          title="Bearbeiten"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            transform: "scale(1.3)",
          }}
          title="Löschen"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
      </div>

      <div
        style={{
          position: "relative",
          left: "12%",
          width: "fit-content",
          marginTop: "5%",
        }}
      >
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            transform: "scale(1.3)",
          }}
          title="Zurück"
          onClick={handleGoingBack}
        >
          <KeyboardBackspaceIcon />
        </button>
      </div>
      {isEditing && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "9999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "850px",
            color: modalTextColor,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              color: modalTextColor, // Dynamische Textfarbe
            }}
          >
            <h4>Benutzerdaten bearbeiten</h4>

            {error && (
              <div
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: "10px" }}>
              <label>Benutzername:</label>
              <input
                type="text"
                name="username"
                value={updatedUser?.username}
                onChange={handleEditChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Gruppe:</label>
              <input
                type="text"
                name="group"
                value={updatedUser?.group}
                onChange={handleEditChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Vorname:</label>
              <input
                type="text"
                name="first_name"
                value={updatedUser?.name.first_name}
                onChange={(e) => handleEditChange(e)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Nachname:</label>
              <input
                type="text"
                name="last_name"
                value={updatedUser?.name.last_name}
                onChange={(e) => handleEditChange(e)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Status:</label>
              <input
                type="text"
                name="status"
                value={updatedUser?.status}
                onChange={handleEditChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
              className="CancelBtn"
            >
              <button
                onClick={handleSaveChanges}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                title="Speichern"
              >
                <AddIcon style={{ transform: "scale(1.5)" }} />
              </button>
              <button
                className="C"
                onClick={() => setIsEditing(false)}
                style={{
                  border: "none",
                  cursor: "pointer",
                }}
                title="Abbrechen"
              >
                <CancelIcon id="asasd" style={{ transform: "scale(1.5)" }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
