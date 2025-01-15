import React from "react";
import Email from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import styles from "./Contact.module.css";

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.contactBlock}>
          <span className={styles.emailIcon}>
            <PhoneIcon className={styles.icon} />
          </span>
          <h2>Call to us</h2>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>
        </div>
        <div className={styles.contactBlock}>
          <span className={styles.emailIcon}>
            <Email className={styles.icon} />
          </span>
          <h2>Write to us</h2>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>
      </div>
      <div className={styles.right}>
        <form className={styles.form}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Your Name"
              className={styles.input}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
            <input
              type="tel"
              placeholder="Phone"
              className={styles.input}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>
          <textarea
            placeholder="Message"
            className={styles.textarea}
          ></textarea>
          <button
            type="submit"
            aria-label="Send your message"
            className={styles.button}
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
