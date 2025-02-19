import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addToCart } from "../../Utils/cartUtils";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Styles/BestSelling.module.css";

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
    <Box className={styles.container} sx={{ width: "90%", mx: "auto" }}>
      <Box
        className={styles.title}
        sx={{
          display: "flex",
          justifyContent: "normal",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h2"
          className={styles.title}
          sx={{
            fontSize: { xs: "24px", md: "50px" },
            textAlign: { xs: "center", md: "left" },
            marginLeft: { xs: "70px", md: "200px" },
            marginTop: { xs: "0px", md: "200px" },
          }}
        >
          Best Selling Products
        </Typography>
      </Box>
      <Box
        className={styles.productList}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "30px", md: "20px" },
          mt: 3,
        }}
      >
        {products.map((product) => {
          const discount = 25;
          const discountPrice =
            product.price - product.price * (discount / 100);
          const discountedPrice = discountPrice.toFixed(2);

          return (
            <Box
              key={product.id}
              className={styles.productCard}
              sx={{ width: { xs: "100%", sm: "270px" }, height: "350px", p: 2 }}
            >
              <Box className={styles.discountLabel}>-25%</Box>
              <Box className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </Box>
              <Typography
                className={styles.productTitle}
                sx={{ fontSize: "14px", mt: 2 }}
              >
                {product.title}
              </Typography>
              <Box
                className={styles.priceWrapper}
                sx={{ display: "flex", gap: "5px" }}
              >
                <Typography
                  className={styles.oldPrice}
                  sx={{
                    fontSize: "14px",
                    color: "gray",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography
                  className={styles.discountedPrice}
                  sx={{ fontSize: "14px", color: "red", ml: 1 }}
                >
                  ${discountedPrice}
                </Typography>
              </Box>
              {product.rating && (
                <Box
                  className={styles.rating}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "black",
                    mt: 1,
                  }}
                >
                  <span>{"⭐".repeat(Math.round(product.rating.rate))}</span>
                  <span>({product.rating.count})</span>
                </Box>
              )}
              <Button
                className={styles.favoriteButton}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "black",
                }}
                onClick={() => addToCart(product)}
              >
                <FavoriteBorderIcon />
              </Button>
              <Button
                className={styles.viewButton}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "40px",
                  color: "black",
                }}
                onClick={() => goToProduct(product.id)}
              >
                <VisibilityIcon />
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BestSelling;
