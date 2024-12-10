import React from "react";
import users from "./userdata.json";

type User = {
  id: number;
  username: string;
};

const Users: React.FC = () => {
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            ID: {user.id}, Username: {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
