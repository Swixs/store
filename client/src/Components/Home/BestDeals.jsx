import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCart } from "../../Utils/cartUtils";
import styles from "./Styles/BestDeals.module.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const BestDeals = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    if (location.pathname === "/") {
      fetchProducts();
    }
  }, [location.pathname]);

  const startIndex = currentPage * itemsPerPage;
  const currentProducts =
    currentPage === 1
      ? products.slice(startIndex, startIndex + 4)
      : products.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < products.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const navigate = useNavigate();
  const goToProduct = (productId) => {
    navigate(`/Product/${productId}`);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Flash Sales</h2>
      <div className={styles.productContainer}>
        {currentProducts.map((product) => {
          const discount = 25;
          const discountPrice =
            product.price - product.price * (discount / 100);
          const discountedPrice = discountPrice.toFixed(2);

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.discount}>-25%</div>
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <div className={styles.priceContainer}>
                <p className={styles.originalPrice}>
                  ${product.price.toFixed(2)}
                </p>
                <p className={styles.discountedPrice}>${discountedPrice}</p>
              </div>
              {product.rating && (
                <div className={styles.rating}>
                  <span>{"⭐".repeat(product.rating.rate)}</span>
                  <span>({product.rating.count})</span>
                </div>
              )}

              <div className={styles.buttonContainer}>
                <button
                  className={styles.favoriteButton}
                  onClick={() => addToCart(product)}
                >
                  <FavoriteBorderIcon />
                </button>
                <button
                  className={styles.viewButton}
                  onClick={() => goToProduct(product.id)}
                >
                  <VisibilityIcon />
                </button>
              </div>
            </div>
          );
        })}

        {currentPage === 1 && !loading && (
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              <img
                src={products[startIndex + 4]?.image}
                alt="Blurry Product"
                className={styles.image}
                style={{ filter: "blur(6px)" }}
              />
              <h3 className={styles.productTitle}>
                {products[startIndex + 4]?.title || "Product"}
              </h3>
              <p className={styles.originalPrice}>
                ${products[startIndex + 4]?.price || "Price"}
              </p>
            </div>
            <Link to="/Products">
              <button className={styles.viewAllButton}>
                View all products
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={styles.arrowButton}
        >
          ◀
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage >= 1}
          className={styles.arrowButton}
        >
          ▶
        </button>
      </div>

      <div className={styles.viewAllButtonContainer}>
        <Link to="/Products">
          <button className={styles.viewAllButton}>View all products</button>
        </Link>
      </div>
    </div>
  );
};

export default BestDeals;
