import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import LoginImg from "../../Image/imageLogin/Login.png";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Проверяем, является ли экран мобильным (ширина меньше 1024px)
  const isMobile = useMediaQuery("(max-width:1024px)");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.login === login && user.password === password
    );

    if (user) {
      setMessage("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
      window.location.reload();
    } else {
      setMessage("Invalid login or password.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxSizing: "border-box",
        margin: "auto",
        padding: "20px",
        flexDirection: isMobile ? "column" : "row", // Если мобильный — в колонку
        gap: "20px",
      }}
    >
      {!isMobile && (
        <div>
          <img
            src={LoginImg}
            alt="Login Illustration"
            style={{
              width: "100%",
              maxWidth: "805px",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
      <div
        style={{
          flex: "1",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "20px",
          width: "100%",
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
            fullWidth
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="filled"
            fullWidth
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
              width: "100%",
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
