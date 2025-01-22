import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addToCart } from "../../Utils/cartUtils";
import { useNavigate } from "react-router-dom";

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        const filteredProducts = response.data
          .sort((a, b) => b.rating?.rate - a.rating?.rate)
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const goToProduct = (productId) => {
    navigate(`/Product/${productId}`);
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <h2
        style={{
          textAlign: "left",
          marginLeft: 145,
          marginTop: 200,
          fontSize: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Best Selling Products
        <button
          style={{
            padding: "5px 10px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "3px",
            marginRight: 165,
          }}
        >
          View All
        </button>
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          margin: "auto 100px",
        }}
      >
        {products.map((product) => {
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
                  <span>{"⭐".repeat(Math.round(product.rating.rate))}</span>
                  <span>({product.rating.count})</span>
                </div>
              )}
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
          );
        })}
      </div>
    </div>
  );
};

export default BestSelling;
