import React from "react";

import UserItem from "../user-item";
import Card from "../../../shared/components/ui-elements/card";

import "./users-list.css";

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul>
      {items.map((user) => (
        <UserItem
          key={user["_id"]}
          id={user["_id"]}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
