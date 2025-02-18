import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Checkout.module.css";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAlerts } from "../../Context/alertContext";

const Checkout = () => {
  const { addAlert } = useAlerts();
  const location = useLocation();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  const handleApplyCoupon = () => {
    addAlert("Coupon code applied!");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePlaceOrder = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "apartment") {
        newErrors[key] = `${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addAlert("Order placed successfully!");
    alert("Order placed successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.section}>
          <h2 className={styles.title}>Billing Details</h2>
          <form className={styles.form}>
            {[
              "firstName",
              "secondName",
              "streetAddress",
              "townCity",
              "phoneNumber",
              "email",
            ].map((field) => (
              <div key={field} className={styles.inputContainer}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`${field
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()}*`}
                  className={`${styles.input} ${
                    errors[field] ? styles.errorInput : ""
                  }`}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
                {errors[field] && (
                  <div className={styles.errorMessage}>
                    <FaExclamationTriangle className={styles.errorIcon} />
                    <span>{errors[field]}</span>
                  </div>
                )}
              </div>
            ))}

            <div className={styles.inputContainer}>
              <input
                type="text"
                name="apartment"
                placeholder="apartment, floor, etc. (optional)"
                className={styles.input}
                value={formData.apartment}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="save-info"
                className={styles.checkbox}
              />
              <label htmlFor="save-info" className={styles.checkboxLabel}>
                save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        <div className={styles.section}>
          <h2 className={styles.title}>Your Order</h2>
          <div className={styles.orderSummary}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.title}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <hr className={styles.hr} />
            <div className={styles.orderItem}>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.orderItem}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <hr className={styles.hr} />
            <div className={`${styles.orderItem} ${styles.total}`}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.paymentOptions}>
              {["bank", "cod"].map((method) => (
                <div key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="paymentMethod"
                    className={styles.checkbox}
                    checked={formData.paymentMethod === method}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: method,
                      }))
                    }
                  />
                  <label htmlFor={method}>
                    {method === "bank" ? "Bank" : "Cash on delivery"}
                  </label>
                </div>
              ))}
            </div>
            {errors.paymentMethod && (
              <div className={styles.errorMessage}>
                <FaExclamationTriangle className={styles.errorIcon} />
                <span>{errors.paymentMethod}</span>
              </div>
            )}
            <div className={styles.couponContainer}>
              <input
                type="text"
                placeholder="coupon code"
                className={styles.couponInput}
              />
              <button
                onClick={handleApplyCoupon}
                className={styles.buttonSecondary}
              >
                apply coupon
              </button>
            </div>
            <button
              onClick={handlePlaceOrder}
              className={styles.buttonSecondary}
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
