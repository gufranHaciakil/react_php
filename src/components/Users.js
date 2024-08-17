import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import UsersTable from "./UsersTable";
import { useLoadUsers } from "../utils";
import axios from "axios";
const Users = () => {
  const { users, loadUsers } = useLoadUsers();

  const [windowMsg, setWindowMsg] = useState("");
  useEffect(() => {
    window.addEventListener("blur", () => {
      setWindowMsg(`come back!😡`);
    });
    window.addEventListener("focus", () => {
      setWindowMsg("Welcome Back!");
    });
  }, []);

  const handleAlert = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    let confirmD = confirm("Are you sure you want to delete this user? ");
    if (confirmD === true) {
      const responseDelete = await axios.delete(
        "http://localhost/php_react/insert.php/" + id
      );
      loadUsers();
      alert(responseDelete.data.result);
    }
  };

  return (
    <div className="users">
      <DocumentTitle title={windowMsg}></DocumentTitle>
      <h1>Users:</h1>
      <button>
        <a href="/addUser">Add User</a>
      </button>
      <div className="users-table">
        <UsersTable
          users={users}
          loadUsers={loadUsers}
          onUserDelete={handleAlert}
        />
      </div>
    </div>
  );
};

export default Users;
