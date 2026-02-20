import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { addToCart } from "../../Utils/cartUtils";
import styles from "./Styles/BestDeals.module.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useAuth } from "../../Context/authContext";
import Swal from "sweetalert2";

const BestDeals = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;
  const location = useLocation();
  const { user } = useAuth();

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

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

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
    return <LoadingScreen />;
  }

  return (
    <div id="flash-sales" className={styles.container}>
      <h2 className={styles.title}>Flash Sales</h2>
      <div className={styles.productContainer}>
        {currentProducts.map((product) => {
          const discount = 25;
          const discountPrice =
            product.price - product.price * (discount / 100);
          const discountedPrice = discountPrice.toFixed(2);

          return (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => goToProduct(product.id)}
            >
              <div className={styles.discount}>-25%</div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.favoriteButton}
                  onClick={(e) => handleAddToCart(e, product)}
                  type="button"
                  aria-label="Add to cart"
                >
                  <FavoriteBorderIcon sx={{ fontSize: 22 }} />
                </button>
              </div>
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.priceContainer}>
                  <p className={styles.originalPrice}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p className={styles.discountedPrice}>${discountedPrice}</p>
                </div>
                {product.rating && (
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{
                          fontSize: 18,
                          color: i < Math.round(product.rating.rate) ? "#f59e0b" : "#e5e7eb",
                        }}
                      />
                    ))}
                    <span className={styles.ratingCount}>({product.rating.count})</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {currentPage === 1 && !loading && products[startIndex + 4] && (
          <div className={styles.viewAllCard}>
            <div className={styles.productImage}>
              <img
                src={products[startIndex + 4].image}
                alt=""
                className={styles.image}
                style={{ filter: "blur(4px)" }}
              />
            </div>
            <h3 className={styles.productTitle}>
              {products[startIndex + 4].title}
            </h3>
            <p className={styles.originalPrice}>
              ${products[startIndex + 4].price?.toFixed(2)}
            </p>
            <Link to="/Products">
              <button type="button" className={styles.viewAllButton}>
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
          type="button"
          aria-label="Previous page"
        >
          <ChevronLeftIcon sx={{ fontSize: 28 }} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= 1}
          className={styles.arrowButton}
          type="button"
          aria-label="Next page"
        >
          <ChevronRightIcon sx={{ fontSize: 28 }} />
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
