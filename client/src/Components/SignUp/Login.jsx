import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginImg from "../../Image/imageLogin/Login.png";
import { login as apiLogin } from "../../api/authApi";
import styles from "./Auth.module.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      const data = await apiLogin(login, password);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setMessage({ type: "success", text: "Login successful!" });
      navigate("/");
      window.location.reload();
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Invalid login or password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.illustration}>
          <img src={LoginImg} alt="Login" />
        </div>
        <div className={styles.formWrap}>
          <div className={styles.card}>
            <h1 className={styles.title}>Log in to PickNNBuy</h1>
            <p className={styles.subtitle}>
              Enter your details to access your account.
            </p>
            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="login">
                  Login
                </label>
                <input
                  id="login"
                  type="text"
                  className={styles.input}
                  placeholder="Your login"
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
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
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
                {loading ? "Signing in…" : "Log in"}
              </button>
            </form>
            <Link to="/registration" className={styles.secondaryBtn} style={{ marginTop: 16 }}>
              No account? Register here
            </Link>
          </div>
          <p className={styles.footerText}>
            Don’t have an account?{" "}
            <Link to="/registration" className={styles.footerLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
