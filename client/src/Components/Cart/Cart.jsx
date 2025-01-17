import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  if (storedUser) {
    const userCart =
      JSON.parse(localStorage.getItem(`cart_${storedUser.login}`)) || [];
    setCartItems(userCart);
  } else {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
    setCartItems(guestCart);
  }
}, []);

  const updateLocalStorage = (updatedCart) => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.login}`,
        JSON.stringify(updatedCart)
      );
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleApplyCoupon = () => {
    console.log("Coupon applied:", coupon);
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleReturnToShop = () => {
    window.location.href = "/";
  };

  const handleUpdateCart = () => {
    console.log("Cart updated!", cartItems);
    updateLocalStorage(cartItems);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Product</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Quantity</th>
            <th className={styles.th}>Subtotal</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.emptyMessage}>
                Your cart is empty.
              </td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>{item.title}</td>
                <td className={styles.td}>${item.price}</td>
                <td className={styles.td}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className={styles.input}
                  />
                </td>
                <td className={styles.td}>${item.price * item.quantity}</td>
                <td className={styles.td}>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <button onClick={handleReturnToShop} className={styles.buttonSecondary}>
          Return to Shop
        </button>
        <button onClick={handleUpdateCart} className={styles.buttonSecondary}>
          Update Cart
        </button>
      </div>
      <div className={styles.footer}>
        <div className={styles.couponSection}>
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className={styles.couponInput}
          />
          <button onClick={handleApplyCoupon} className={styles.buttonPrimary}>
            Apply Coupon
          </button>
        </div>
        <div className={styles.summary}>
          <h3 className={styles.summaryHeading}>Cart Total</h3>
          <div className={styles.summaryRow}>
            <p className={styles.summaryText}>Subtotal:</p>
            <p className={styles.summaryValue}>${calculateSubtotal()}</p>
          </div>
          <div className={styles.summaryRow}>
            <p className={styles.summaryText}>Shipping:</p>
            <p className={styles.summaryValue}>Free</p>
          </div>
          <div className={styles.lastSummaryRow}>
            <h3 className={styles.summaryTotal}>Total:</h3>
            <h3 className={styles.summaryTotalValue}>${calculateSubtotal()}</h3>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonPrimary}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
