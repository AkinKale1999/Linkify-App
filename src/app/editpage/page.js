"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "../components/protectedroute/protectedroute";

const EditPage = () => {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    if (id) {
      const foundEntry = rows.find((row) => row.id === parseInt(id));
      if (foundEntry) {
        setEntry(foundEntry);
        setLoading(false);
      } else {
        setLoading(false); // Eintrag nicht gefunden
      }
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Ladeanzeige
  }

  if (!entry) {
    return <div>Entry not found!</div>; // Fehleranzeige
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Edit Entry {entry.id}</h1>
        <form>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={entry.firstName}
              onChange={(e) =>
                setEntry({ ...entry, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={entry.lastName}
              onChange={(e) => setEntry({ ...entry, lastName: e.target.value })}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              value={entry.age || ""}
              onChange={(e) => setEntry({ ...entry, age: e.target.value })}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditPage;
