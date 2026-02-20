import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../../Image/imageLogin/Login.png";
import { register as apiRegister } from "../../api/authApi";
import styles from "./Auth.module.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      await apiRegister(username, login, password);
      setMessage({ type: "success", text: "Registration successful! You can log in now." });
      setUsername("");
      setLogin("");
      setPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.illustration}>
          <img src={LoginImg} alt="Sign up" />
        </div>
        <div className={styles.formWrap}>
          <div className={styles.card}>
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>
              Join PickNNBuy to start shopping.
            </p>
            <form className={styles.form} onSubmit={handleRegister}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={styles.input}
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="login">
                  Login
                </label>
                <input
                  id="login"
                  type="text"
                  className={styles.input}
                  placeholder="Email or username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              {message.text && (
                <p
                  className={`${styles.message} ${
                    message.type === "error" ? styles.messageError : styles.messageSuccess
                  }`}
                >
                  {message.text}
                </p>
              )}
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>
          </div>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.footerLink}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
