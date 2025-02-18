import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>404 Not Found</h1>
      <p className={styles.subtitle}>
        Your visited page not found. You may go home page.
      </p>
      <button className={styles.backHomeButton} onClick={goHome}>
        Back to home page
      </button>
    </div>
  );
};

export default NotFoundPage;
