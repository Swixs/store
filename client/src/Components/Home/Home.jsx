import React, { useState, useEffect } from "react";
import Slider from "./SliderHome";
import BestDeals from "./BestDeals";
import Categories from "./Categories";
import BestSelling from "./BestSelling";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        const capitalizedCategories = data.map(
          (category) => category.charAt(0).toUpperCase() + category.slice(1)
        );
        setCategories(capitalizedCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px 100px",
          marginLeft: "120px",
        }}
      >
        <div
          style={{
            borderRight: "1px solid black",
            paddingRight: "100px",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {categories.map((category, index) => (
              <li
                key={index}
                style={{
                  padding: "5px 0",
                  width: "100%",
                  fontSize: "20px",
                  marginTop: 10,
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: "2", marginTop: 30, width: 700 }}>
          <Slider />
        </div>
      </div>
      <BestDeals />
      <Categories />
      <BestSelling />
    </div>
  );
};

export default Home;
