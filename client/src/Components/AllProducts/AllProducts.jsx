import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AllProducts.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { addToCart } from "../../Utils/cartUtils";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
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
        const uniqueCategories = [
          "all",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");

    if (category && category !== "all") {
      setFilteredProducts(
        products.filter(
          (product) => product.category.toLowerCase() === category
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
    (category) => {
      navigate(`?category=${category}`); 
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
            {categories.map((category) => (
              <li key={category} className={styles.filterItem}>
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    checked={
                      new URLSearchParams(location.search).get("category") ===
                      category
                    }
                  />
                  <span className="custom-checkmark"></span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.productsSection}>
        <h1 className={styles.title}>All Products</h1>
        <div className={styles.productsGrid}>
          {currentProducts.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <button
                onClick={() => goToProduct(product.id)}
                className={styles.eyeButton}
              >
                <RemoveRedEyeIcon fontSize="small" />
              </button>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
              <h2 className={styles.productTitle}>{product.title}</h2>
              <p className={styles.productPrice}>${product.price}</p>
              <button
                className={styles.addButton}
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

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
      </main>
    </div>
  );
};

export default AllProducts;
