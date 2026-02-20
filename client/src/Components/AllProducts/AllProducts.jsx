import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AllProducts.module.css";
import { addToCart } from "../../Utils/cartUtils";

const CATEGORIES = [
  { slug: "all", name: "All" },
  { slug: "kids-baby", name: "Kids & Baby" },
  { slug: "cars-auto-tuning", name: "Cars & Auto Tuning" },
  { slug: "flat-pack-furniture", name: "Flat-pack Furniture" },
];

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const apiCategoryToSlug = (apiCategory) => {
    const map = {
      jewelery: "kids-baby",
      electronics: "cars-auto-tuning",
      "men's clothing": "flat-pack-furniture",
      "women's clothing": "flat-pack-furniture",
    };
    return map[apiCategory?.toLowerCase?.()] || null;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    if (category && category !== "all") {
      setFilteredProducts(
        products.filter(
          (product) => apiCategoryToSlug(product.category) === category
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [location, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleCategoryChange = useCallback(
    (slug) => {
      navigate(slug === "all" ? "/Products" : `/Products?category=${slug}`);
    },
    [navigate]
  );

  const goToProduct = (productId) => {
    navigate(`/Product/${productId}`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Filters</h2>
        <div className={styles.filterGroup}>
          <h3>Category</h3>
          <ul className={styles.filterList}>
            {CATEGORIES.map(({ slug, name }) => (
              <li key={slug} className={styles.filterItem}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={slug}
                    onChange={() => handleCategoryChange(slug)}
                    checked={
                      (new URLSearchParams(location.search).get("category") || "all") === slug
                    }
                  />
                  {name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.productsSection}>
        <h1 className={styles.title}>All Products</h1>
        {currentProducts.length === 0 ? (
          <p className={styles.empty}>No products in this category.</p>
        ) : (
        <div className={styles.productsGrid}>
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productItem}
              onClick={() => goToProduct(product.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goToProduct(product.id);
              }}
            >
              <div className={styles.imageWrap}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.productTitle}>{product.title}</h2>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {totalPages > 0 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        )}
      </main>
    </div>
  );
};

export default AllProducts;
