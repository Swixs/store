import React from "react";
import { Link } from "react-router-dom";
import styles from "./Discounts.module.css";

const Discounts = () => {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Discounts</h1>
      <p className={styles.subtitle}>
        Check out our catalog for the best deals and special offers.
      </p>
      <Link to="/Products" className={styles.link}>
        View catalog
      </Link>
    </section>
  );
};

export default Discounts;
