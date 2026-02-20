import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { addToCart } from "../../Utils/cartUtils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/authContext";
import styles from "./Styles/BestSelling.module.css";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        const filteredProducts = response.data
          .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
          .slice(0, 4);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const goToProduct = (productId) => {
    navigate(`/Product/${productId}`);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    if (!user) {
      Swal.fire({
        title: "Register to add product to cart",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <section className={styles.container}>
        <p className={styles.loading}>Loading...</p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Best Selling Products</h2>

      <div className={styles.productList}>
        {products.map((product) => {
          const discount = 25;
          const discountPrice =
            product.price - product.price * (discount / 100);
          const discountedPrice = discountPrice.toFixed(2);

          return (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => goToProduct(product.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToProduct(product.id);
              }}
            >
              <div className={styles.discountLabel}>-25%</div>
              <button
                type="button"
                className={styles.favoriteButton}
                onClick={(e) => handleAddToCart(product, e)}
                aria-label="Add to cart"
              >
                <FavoriteBorderIcon sx={{ fontSize: 22 }} />
              </button>
              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.priceWrapper}>
                  <span className={styles.oldPrice}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className={styles.discountedPrice}>
                    ${discountedPrice}
                  </span>
                </div>
                {product.rating && (
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          fontSize: 18,
                          color:
                            i < Math.round(product.rating.rate)
                              ? "#f59e0b"
                              : "#e5e7eb",
                        }}
                      />
                    ))}
                    <span className={styles.ratingCount}>
                      ({product.rating.count})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSelling;
