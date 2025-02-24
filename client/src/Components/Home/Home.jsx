import React, { useState, useEffect } from "react";
import Slider from "./SliderHome";
import BestDeals from "./BestDeals";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div style={{ gap: "20px" }}>
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
