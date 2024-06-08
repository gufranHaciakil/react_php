import axios from "axios";
import { useEffect, useState } from "react";

const useLoadUsers = () => {
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const response = await axios.get("http://localhost/php_react/insert.php");
    setUsers(response.data.result);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return { users, loadUsers };
};

export default useLoadUsers;
