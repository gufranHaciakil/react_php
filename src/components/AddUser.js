import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddUser = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [message, setmessage] = useState("");
  const [valiEmail, setValiEmail] = useState("");

  const hanleInputs = (eo) => {
    let name = eo.target.name;
    let value = eo.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    const formData = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      state: inputs.state,
    };
    const result = await axios.post(
      "http://localhost/php_react/insert.php",
      formData
    );
    let result_msg = result.data.result;
    if (result_msg === "User added successfully") {
      setmessage(result.data.result);
      setInterval(() => {
        navigate("/");
      }, 1500);
    } else {
      setValiEmail(result.data.result);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <p style={{ color: "green" }}>{message}</p>{" "}
      <form
        onSubmit={handleSubmit}
        action="http://localhost/php_react/insert.php"
        method="post"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={hanleInputs}
          required
        />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={hanleInputs}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={hanleInputs}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={hanleInputs}
          required
        />
        <button style={{ margin: "1rem" }}>Add</button>
        <p>{valiEmail}</p>
      </form>
    </div>
  );
};

export default AddUser;
