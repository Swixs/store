import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 1);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
