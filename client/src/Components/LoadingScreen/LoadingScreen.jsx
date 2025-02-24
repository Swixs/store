import React, { useState, useEffect } from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 150);

    const blinkInterval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.text} style={{ opacity: visible ? 1 : 0.5 }}>
        Exclusive
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
