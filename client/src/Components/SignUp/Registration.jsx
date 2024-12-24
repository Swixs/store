import React, { useState } from "react";
import TextField from "@mui/material/TextField";

import LoginImg from "../../Image/imageLogin/Login.png";
import Google from "../../Image/imageLogin/IconGoogle.png";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.login === login);

    if (existingUser) {
      setMessage("A user with this login already exists.");
      return;
    }

    const newUser = { username, login, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Registration was successful!");
    setUsername("");
    setLogin("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
        boxSizing: "border-box",
        margin: "auto 200px",
      }}
    >
      <div>
        <img
          src={LoginImg}
          alt="Login Illustration"
          style={{
            width: "805px",
            height: "781px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      <div
        style={{
          flex: "1",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <h2>Create an account</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
          onSubmit={handleRegister}
        >
          <TextField
            id="username"
            label="Username"
            variant="filled"
            style={{ fontSize: "16px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="login"
            label="Login"
            variant="filled"
            style={{ fontSize: "16px" }}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="filled"
            style={{ fontSize: "16px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <img
              src={Google}
              alt="google"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            Sign up with Google
          </button>
        </form>
        {message && <p>{message}</p>}
        <p style={{ fontSize: "14px" }}>
          Already have account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
