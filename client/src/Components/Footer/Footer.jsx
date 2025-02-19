import React from "react";
import NavigationButton from "./NavigationButton";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Exclusive</h3>
          <p className={styles.footerText}>Subscribe</p>
          <p className={styles.footerText}>Get 10% off your first order</p>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.footerInput}
          />
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Support</h3>
          <p className={styles.footerText}>111 Bijoy sarani, Dhaka, DH 1515</p>
          <p className={styles.footerText}>exclusive@gmail.com</p>
          <p className={styles.footerText}>+88015-88888-9999</p>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Account</h3>
          <NavigationButton to="/profile" className={styles.footerButton}>
            My Account
          </NavigationButton>
          <NavigationButton to="/login" className={styles.footerButton}>
            Login / Register
          </NavigationButton>
          <NavigationButton to="/cart" className={styles.footerButton}>
            Cart
          </NavigationButton>
          <NavigationButton to="/wishlist" className={styles.footerButton}>
            Wishlist
          </NavigationButton>
          <NavigationButton to="/Products" className={styles.footerButton}>
            Shop
          </NavigationButton>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <button className={styles.footerButton}>Privacy Policy</button>
          <button className={styles.footerButton}>Terms Of Use</button>
          <button className={styles.footerButton}>FAQ</button>
          <button className={styles.footerButton}>Contact</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
