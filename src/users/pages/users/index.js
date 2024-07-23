import React, { useEffect, useState } from "react";

import UsersList from "../../components/users-list";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";
import { useHttpClient } from "../../../shared/custom-hooks/http-hook";

const Users = () => {
  const [users, setUsers] = useState([]);

  const { loading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest("getuser");
        setUsers(response.users);
      } catch (err) {
        console.log("error while fetching users", err);
      }
    };
    getUsers();
  }, [sendRequest]);

  return (
    <main>
      <ErrorModal error={error} onClear={clearError} />
      {loading ? (
        <div>
          <LoadingSpinner asOverlay={true} />
        </div>
      ) : (
        <UsersList items={users} />
      )}
    </main>
  );
};

export default Users;
