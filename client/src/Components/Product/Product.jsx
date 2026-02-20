import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StarIcon from "@mui/icons-material/Star";
import { addToCart } from "../../Utils/cartUtils";
import axios from "axios";
import styles from "./Product.module.css";

const MOCK_REVIEWS = [
  { id: 1, author: "John D.", date: "2024-01-15", rating: 5, text: "Great product, fast delivery. Very satisfied with the quality." },
  { id: 2, author: "Sarah M.", date: "2024-01-18", rating: 4, text: "Good value for money. Would recommend to friends." },
  { id: 3, author: "Alex K.", date: "2024-02-01", rating: 5, text: "Exactly as described. Packaging was secure." },
  { id: 4, author: "Emma L.", date: "2024-02-05", rating: 3, text: "Nice product but delivery took a bit longer than expected." },
  { id: 5, author: "Mike R.", date: "2024-02-10", rating: 5, text: "Perfect! Will order again." },
  { id: 6, author: "Lisa P.", date: "2024-02-14", rating: 4, text: "Solid quality. Happy with my purchase." },
  { id: 7, author: "David W.", date: "2024-02-20", rating: 5, text: "Excellent service and product. Thank you!" },
  { id: 8, author: "Anna B.", date: "2024-03-01", rating: 4, text: "Good experience overall. Minor issue with packaging." },
  { id: 9, author: "Chris T.", date: "2024-03-08", rating: 5, text: "Best purchase this year. Highly recommend." },
  { id: 10, author: "Julia S.", date: "2024-03-12", rating: 4, text: "Met my expectations. Delivery was on time." },
  { id: 11, author: "James H.", date: "2024-03-18", rating: 5, text: "Outstanding quality. Very pleased." },
  { id: 12, author: "Maria G.", date: "2024-03-22", rating: 3, text: "Decent product. Could be better for the price." },
  { id: 13, author: "Tom F.", date: "2024-04-01", rating: 5, text: "Super fast shipping. Product is great." },
  { id: 14, author: "Kate N.", date: "2024-04-05", rating: 4, text: "Nice and reliable. Would buy again." },
  { id: 15, author: "Paul C.", date: "2024-04-10", rating: 5, text: "Exactly what I needed. Great customer support too." },
];

const REVIEWS_PER_PAGE = 5;

const Product = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [reviewPage, setReviewPage] = useState(1);

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

  const totalReviewPages = Math.ceil(MOCK_REVIEWS.length / REVIEWS_PER_PAGE);
  const currentReviews = MOCK_REVIEWS.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE
  );

  return (
    <div className={styles.productWrap}>
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

    <section className={styles.reviewsSection}>
      <h2 className={styles.reviewsTitle}>Reviews</h2>
      <div className={styles.reviewsList}>
        {currentReviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
            <div className={styles.reviewStars}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{
                    fontSize: 18,
                    color: i < review.rating ? "#f59e0b" : "#e5e7eb",
                  }}
                />
              ))}
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
      {totalReviewPages > 1 && (
        <div className={styles.reviewsPagination}>
          <button
            type="button"
            className={styles.reviewPageBtn}
            disabled={reviewPage === 1}
            onClick={() => setReviewPage((p) => p - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalReviewPages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.reviewPageBtn} ${reviewPage === i + 1 ? styles.reviewPageBtnActive : ""}`}
              onClick={() => setReviewPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className={styles.reviewPageBtn}
            disabled={reviewPage === totalReviewPages}
            onClick={() => setReviewPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
    </div>
  );
};

export default Product;
