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
          gap: "20px",
        }}
      >
        <div style={{ flex: "2", marginTop: 30 }}>
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
