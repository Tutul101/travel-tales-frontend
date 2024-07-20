import React, { useEffect, useState } from "react";

import UsersList from "../../components/users-list";
import axios from "axios";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/");
        const responseData = await response.data.users;
        console.log("responseData", responseData);
        setUsers(responseData);
      } catch (err) {
        setError(err.message || "Something went wrong please try again");
      }
    };
    getUsers();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  return (
    <main>
      <ErrorModal error={error} onClear={errorHandler} />
      {loading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      <UsersList items={users} />
    </main>
  );
};

export default Users;
