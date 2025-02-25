import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Quantity increased!",
          text: "The product is already in the cart, quantity has been increased.",
          icon: "info",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        userCart.push(productWithQuantity);
        Swal.fire({
          title: "Added to cart!",
          text: "Product added successfully.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
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
        Swal.fire({
          title: "Quantity increased!",
          text: "The product is already in the cart, quantity has been increased.",
          icon: "info",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        const productWithQuantity = { ...product, quantity: 1 };
        guestCart.push(productWithQuantity);
        Swal.fire({
          title: "Added to cart!",
          text: "Product added successfully.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to add product. Try again.",
      icon: "error",
      confirmButtonText: "Ок",
    });
  }
};
