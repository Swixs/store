import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CircularProgress from "@mui/material/CircularProgress";
import { addToCart } from "../../Utils/cartUtils";

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

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <h2
        style={{
          textAlign: "left",
          marginLeft: 43,
          marginTop: 200,
          fontSize: 50,
        }}
      >
        Flash Sales
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          style={{
            padding: "10px",
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
            opacity: currentPage === 0 ? 0.5 : 1,
          }}
        >
          ◀
        </button>

        <div style={{ display: "flex", gap: "10px", overflow: "hidden" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            currentProducts.map((product) => {
              const discount = 25;
              const discountPrice =
                product.price - product.price * (discount / 100);
              const discountedPrice = discountPrice.toFixed(2);

              return (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "270px",
                    height: "350px",
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "2px 6px",
                      fontSize: "12px",
                      borderRadius: "3px",
                    }}
                  >
                    -25%
                  </div>

                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "100%",
                      height: "150px",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      margin: "10px 0",
                      textAlign: "left",
                    }}
                  >
                    {product.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "gray",
                        textDecoration: "line-through",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "red",
                        marginLeft: "10px",
                      }}
                    >
                      ${discountedPrice}
                    </p>
                  </div>
                  {product.rating && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        fontSize: "12px",
                        color: "black",
                        marginTop: "5px",
                      }}
                    >
                      <span>{"⭐".repeat(product.rating.rate)}</span>
                      <span>({product.rating.count})</span>
                    </div>
                  )}

                  <div
                    style={{ display: "flex", gap: "5px", marginTop: "10px" }}
                  >
                    <button
                      style={{
                        padding: "5px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                      onClick={() => addToCart(product)}
                    >
                      <FavoriteBorderIcon />
                    </button>
                    <button
                      style={{
                        padding: "5px",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        position: "absolute",
                        top: "10px",
                        right: "40px",
                      }}
                      onClick={() => goToProduct(product.id)}
                    >
                      <VisibilityIcon />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {currentPage === 1 && !loading && (
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                width: "270px",
                height: "350px",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  filter: "blur(6px)",
                  zIndex: 1,
                  overflow: "hidden",
                  width: "100%",
                  height: "150px",
                }}
              >
                <img
                  src={products[startIndex + 4]?.image}
                  alt="Blurry Product"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <h3 style={{ fontSize: "14px", marginLeft: "10px" }}>
                  {products[startIndex + 4]?.title || "Продукт"}
                </h3>
                <p style={{ fontSize: "14px", color: "gray" }}>
                  ${products[startIndex + 4]?.price || "Цена"}
                </p>
              </div>
              <Link to="/Products">
                <button
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "10px 20px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    zIndex: 2,
                  }}
                >
                  Viem all products
                </button>
              </Link>
            </div>
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage >= 1}
          style={{
            padding: "10px",
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: currentPage >= 1 ? "not-allowed" : "pointer",
            opacity: currentPage >= 1 ? 0.5 : 1,
          }}
        >
          ▶
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Link to="/Products">
          <button
            style={{
              padding: "10px 20px",
              width: "340px",
              height: "60px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Viem all products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BestDeals;
