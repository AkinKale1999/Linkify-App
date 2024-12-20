import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Für URL-Parameter und Router
import axios from "axios"; // Axios importieren
import usersData from "../userdata.json"; // JSON-Datei importieren
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

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
  const [modalTextColor, setModalTextColor] = useState("black"); // Declare state outside of conditionals


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

  function handleGoingBack() {
    router.back();
  }



  return (
    <div id="UserDetailContainer">
      <h3>Benutzer Details</h3>

      <table id="UserDetailTable">
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th className="UserDetailTableHeader">Feld</th>
            <th
              className="UserDetailTableHeader"
            >
              Wert
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="UserDetailTableBody">ID</td>
            <td className="UserDetailTableBody">
              {user.id}
            </td>
          </tr>
          <tr>
            <td className="UserDetailTableBody">
              Benutzername
            </td>
            <td className="UserDetailTableBody">
              {user.username}
            </td>
          </tr>
          <tr>
            <td className="UserDetailTableBody">
              Gruppe
            </td>
            <td className="UserDetailTableBody">
              {user.group}
            </td>
          </tr>
          <tr>
            <td className="UserDetailTableBody">
              Vorname
            </td>
            <td className="UserDetailTableBody">
              {user.name.first_name}
            </td>
          </tr>
          <tr>
            <td className="UserDetailTableBody">
              Nachname
            </td>
            <td className="UserDetailTableBody">
              {user.name.last_name}
            </td>
          </tr>
          <tr>
            <td className="UserDetailTableBody">
              Status
            </td>
            <td className="UserDetailTableBody">
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
          className="UserDetailButton"
          title="Bearbeiten"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </button>
        <button
          className="UserDetailButton"
          title="Löschen"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
      </div>

      <div id="UserDetailModalContainer">
        <button
          className="UserDetailButton"
          title="Zurück"
          onClick={handleGoingBack}
        >
          <KeyboardBackspaceIcon />
        </button>
      </div>


      {/* -------------------------------- */}
      {isEditing && (
        <div id="UserDetailModal" style={{ color: modalTextColor }}>
          <div id="UserDetailModalContent" style={{ color: modalTextColor }}>
            <h4>Benutzerdaten bearbeiten</h4>

            {error && <div id="UserDetailModalError">{error}</div>}

            <div style={{ marginBottom: "10px" }}>
              <label className="EditPageFontColor">Benutzername:</label>
              <input
                type="text"
                name="username"
                value={updatedUser?.username}
                onChange={handleEditChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label className="EditPageFontColor">Gruppe:</label>
              <input
                type="text"
                name="group"
                value={updatedUser?.group}
                onChange={handleEditChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label className="EditPageFontColor">Vorname:</label>
              <input
                type="text"
                name="first_name"
                value={updatedUser?.name.first_name}
                onChange={(e) => handleEditChange(e)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label className="EditPageFontColor">Nachname:</label>
              <input
                type="text"
                name="last_name"
                value={updatedUser?.name.last_name}
                onChange={(e) => handleEditChange(e)}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label className="EditPageFontColor">Status:</label>
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
                className="BtnCancel"
                title="Schließen"
                onClick={() => setIsEditing(false)}
              >
                <CancelIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
