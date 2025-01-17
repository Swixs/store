export const addToCart = (product) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    const userCart =
      JSON.parse(localStorage.getItem(`cart_${currentUser.login}`)) || [];
    userCart.push(product);
    localStorage.setItem(`cart_${currentUser.login}`, JSON.stringify(userCart));
    alert("Product added to your cart!");
  } else {
    const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
    guestCart.push(product);
    localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    alert("Product added to your cart. Please log in to save your cart.");
  }
};
