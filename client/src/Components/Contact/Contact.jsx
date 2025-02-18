import React, { useState } from "react";
import Email from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import styles from "./Contact.module.css";
import { useAlerts } from "../../Context/alertContext";

const ContactPage = () => {
  const { addAlert } = useAlerts();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      name: formData.name.trim() === "",
      message: formData.message.trim() === "",
    };

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
      alert(`Text sent successfully! \nMessage: ${formData.message}`);
      addAlert(`Text sent successfully! \nMessage: ${formData.message}`);
      console.log("Submitted form", formData);
    } else {
      alert("Please correct the errors in the form.");
    }
  };

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder={"Your Name"}
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            onChange={handleChange}
            placeholder="Message"
            className={styles.textarea}
            value={formData.message}
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
