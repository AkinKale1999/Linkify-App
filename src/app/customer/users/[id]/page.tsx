"use client";

import React from "react";
import { useParams } from "next/navigation"; // Für URL-Parameter
import usersData from "../userdata.json"; // JSON-Datei importieren

type User = {
  id: number;
  username: string;
};

const UserDetail: React.FC = () => {
  const { id } = useParams(); // ID aus der URL auslesen

  // Finde den Nutzer mit der entsprechenden ID
  const user = usersData.users.find((user: User) => user.id === Number(id));

  if (!user) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Kein Benutzer mit der ID {id} gefunden.</h3>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Benutzer Details</h3>
      <table
        style={{
          margin: "0 auto",
          borderCollapse: "collapse",
          width: "50%",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Feld</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Wert</th>
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
    </div>
  );
};

export default UserDetail;
