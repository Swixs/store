import React from "react";
import Slider from "./SliderHome";
import BestDeals from "./BestDeals";
import Categories from "./Categories";
import BestSelling from "./BestSelling";

const Home = () => {
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
