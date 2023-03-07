import React, { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const addNewUser = (newUser) => {
    let enterUser = {
      id: Math.floor(Math.random() * 100),
      name: newUser.name,
      age: newUser.age,
    };

    console.log(enterUser);

    setUsers((prevUsers) => {return [enterUser, ...prevUsers] });

    console.log("users", users);
  };

  return (
    <div>
      <AddUser addNewUser={addNewUser}></AddUser>
      <UsersList users={users} />
    </div>
  );
}

export default App;
