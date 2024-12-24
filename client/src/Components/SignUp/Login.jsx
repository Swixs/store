import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import LoginImg from "../../Image/imageLogin/Login.png";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.login === login && user.password === password
    );

    if (user) {
      setMessage("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      setMessage("Invalid login or password.");
    }
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
        <h2>Log in to Exclusive</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
          onSubmit={handleLogin}
        >
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
            Log In
          </button>
        </form>
        {message && <p>{message}</p>}
        <p style={{ fontSize: "14px" }}>
          No account? <a href="/SignUp">Registration</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
