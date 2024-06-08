import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Edituser = () => {
  const [userName, setUserame] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userState, setUserstate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUser = async () => {
    const response = await axios.get(
      "http://localhost/php_react/insert.php/" + id
    );
    console.log(response.data.result);
    setUserame(response.data.result[0].u_name);
    setUserEmail(response.data.result[0].u_email);
    setUserstate(response.data.result[0].u_stat);
  };

  const putUser = async (eo) => {
    eo.preventDefault();
    const formData = {
      id: id,
      name: userName,
      email: userEmail,
      state: userState,
    };
    const response = await axios.put(
      "http://localhost/php_react/insert.php/" + id,
      formData
    );
    setMessage(response.data.result);

    setInterval(() => {
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <form onSubmit={putUser}>
      <h1>Edit User</h1>
      <p style={{ color: "green" }}>{message}</p>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userName}
        onChange={(eo) => {
          setUserame(eo.target.value);
        }}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userEmail}
        onChange={(eo) => {
          setUserEmail(eo.target.value);
        }}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={userState}
        onChange={(eo) => {
          setUserstate(eo.target.value);
        }}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default Edituser;
