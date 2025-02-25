import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useAlerts } from "../../Context/alertContext";

const Cart = () => {
  const { addAlert } = useAlerts();
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [total, setTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
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

  useEffect(() => {
    setTotal(calculateSubtotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

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
      item.id === id
        ? { ...item, quantity: Math.min(parseInt(quantity) || 2, 10) }
        : item
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
    if (coupon.toLowerCase() === "discount" && !discountApplied) {
      const discount = calculateSubtotal() * 0.15;
      setTotal(calculateSubtotal() - discount);
      setDiscountApplied(true);
      Swal.fire({
        title: "Coupon code applied!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      addAlert("Coupon activated! Discount 15%");
    } else if (discountApplied) {
      addAlert("Coupon already applied");
      Swal.fire({
        title: "Coupon already applied",
        text: "Coupon already applied",
        icon: "question",
      });
    } else {
      addAlert("Coupon incorrect");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Coupon incorrect",
      });
    }
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

  const navigate = useNavigate();
  const goToProduct = (productId) => {
    navigate(`/Product/${productId}`);
  };

  const goToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        total,
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Image</th>
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
              <td colSpan="6" className={styles.emptyMessage}>
                Your cart is empty.
              </td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.productImage}
                  />
                </td>
                <td
                  className={styles.td}
                  style={{ cursor: "pointer", transition: "1s" }}
                  onClick={() => goToProduct(item.id)}
                  onMouseEnter={(e) => {
                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "red";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "initial";
                    e.target.style.backgroundColor = "initial";
                  }}
                >
                  {item.title}
                </td>
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
            <h3 className={styles.summaryTotalValue}>${total.toFixed(2)}</h3>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonPrimary} onClick={goToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
