"use client";

import React from "react";
import usersData from "../userdata.json"; // Importiere die JSON-Datei

type User = {
  id: number;
  username: string;
};

const Users: React.FC = () => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Users Liste</h3>
      <table
        style={{
          textAlign: "center",
          width: "95%",
          borderCollapse: "collapse",
          marginLeft: "2.5%",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Username
            </th>
          </tr>
        </thead>
        <tbody>
          {usersData.users.map((user: User) => (
            <tr key={user.id}>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {user.id}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {user.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
