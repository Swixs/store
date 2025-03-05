import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { addToCart } from "../../Utils/cartUtils";
import axios from "axios";
import styles from "./Product.module.css";

const Product = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    if (count <= 99) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className={styles.productPage}>
      <div className={styles.productImages}>
        <div className={styles.thumbnailImages}>
          {[product.image, product.image, product.image, product.image].map(
            (img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className={styles.thumbnail}
              />
            )
          )}
        </div>
        <div className={styles.mainImage}>
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className={styles.productDetails}>
        <h1>{product.title}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.options}>
          <div className={styles.sizes}>
            <div className={styles.sizeSelector}>
              <span>Size:</span>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeButton} ${
                    selectedSize === size ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.quantity}>
          <button className={styles.counterButton} onClick={decrease}>
            -
          </button>
          <span>{count}</span>
          <button className={styles.counterButton} onClick={increase}>
            +
          </button>
          <button className={styles.buyNow} onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
        <div className={styles.deliveryInfo}>
          <div className={styles.deliveryItem}>
            <LocalShippingIcon fontSize="large" />
            <div className={styles.deliveryText}>
              <span className={styles.deliveryTitle}>Free Delivery</span>
              <span className={styles.deliverySubtext}>
                Enter your postal code for Delivery Availability
              </span>
            </div>
          </div>
          <div className={styles.deliveryItem}>
            <SwapHorizIcon fontSize="large" />
            <div className={styles.deliveryText}>
              <span className={styles.deliveryTitle}>Return Delivery</span>
              <span className={styles.deliverySubtext}>
                Free 30 Days Delivery Returns. Details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
