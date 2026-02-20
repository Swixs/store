import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Swal from "sweetalert2";
import styles from "./Contact.module.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      name: formData.name.trim() === "" ? "Name is required" : null,
      message: formData.message.trim() === "" ? "Message is required" : null,
    };
    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((e) => !e);
    if (!isValid) return;

    Swal.fire({
      title: "Message sent!",
      text: "We will get back to you within 24 hours.",
      icon: "success",
      confirmButtonText: "OK",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Get in touch</h1>
      <p className={styles.subtitle}>
        Have a question or feedback? Send us a message and we’ll respond as soon as we can.
      </p>

      <div className={styles.grid}>
        <div className={styles.infoColumn}>
          <div className={styles.contactCard}>
            <div className={styles.iconWrap}>
              <PhoneIcon />
            </div>
            <h3>Call us</h3>
            <p>We’re available 24/7, 7 days a week.</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.iconWrap}>
              <EmailIcon />
            </div>
            <h3>Write to us</h3>
            <p>Fill out the form and we’ll contact you within 24 hours.</p>
            <p>customer@picknnbuy.com</p>
            <p>support@picknnbuy.com</p>
          </div>
        </div>

        <div className={styles.formCard}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>
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
            <div>
              <textarea
                name="message"
                placeholder="Your message"
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
                maxLength={500}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>
            <button type="submit" className={styles.button}>
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
