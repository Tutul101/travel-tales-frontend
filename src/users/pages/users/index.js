import React from "react";

import UsersList from "../../components/users-list";
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Sayantan Chakravarty",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      places: 3,
    },
  ];
  return (
    <main>
      <UsersList items={USERS} />
    </main>
  );
};

export default Users;
