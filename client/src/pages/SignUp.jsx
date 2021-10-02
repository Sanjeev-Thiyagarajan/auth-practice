import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import appService from "../services/appService";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await appService.post("/users/signup", {
        username,
        password,
      });
      console.log(results);
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
