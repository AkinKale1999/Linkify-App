import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const userData = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 25 },
];

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const selectedUser = userData.find((user) => user.id === parseInt(id));
    if (!selectedUser) {
      router.push("/"); // Zurück zur TablePage, falls keine Daten gefunden
    } else {
      setUser(selectedUser);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Benutzer aktualisiert:", user);
    router.push("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit User {user.id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age</label>
          <input name="age" value={user.age} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => router.push("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPage;
