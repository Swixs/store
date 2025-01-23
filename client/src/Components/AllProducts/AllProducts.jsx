import React, { useState, useEffect } from "react";
import styles from "./AllProducts.module.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { addToCart } from "../../Utils/cartUtils";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

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
        console.error("Error attaching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
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
              <li
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`${styles.filterItem} ${
                  selectedCategory === category ? styles.activeFilter : ""
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
