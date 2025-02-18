export const addToCart = (product) => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      const userCart =
        JSON.parse(localStorage.getItem(`cart_${currentUser.login}`)) || [];

      const existingProductIndex = userCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        userCart[existingProductIndex].quantity += 1;
        alert("Product quantity increased!");
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        userCart.push(productWithQuantity);
      }

      localStorage.setItem(
        `cart_${currentUser.login}`,
        JSON.stringify(userCart)
      );
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];

      const existingGuestProductIndex = guestCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingGuestProductIndex !== -1) {
        guestCart[existingGuestProductIndex].quantity += 1;
        alert("Product quantity increased!");
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        guestCart.push(productWithQuantity);
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert(
      "An error occurred while adding the product to your cart. Please try again."
    );
  }
};
