import React from "react";
import ChildCareRoundedIcon from "@mui/icons-material/ChildCareRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import WeekendRoundedIcon from "@mui/icons-material/WeekendRounded";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Categories.module.css";

const CATEGORIES = [
  { name: "Kids & Baby", slug: "kids-baby", icon: ChildCareRoundedIcon },
  { name: "Cars & Auto Tuning", slug: "cars-auto-tuning", icon: DirectionsCarRoundedIcon },
  { name: "Flat-pack Furniture", slug: "flat-pack-furniture", icon: WeekendRoundedIcon },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/Products?category=${slug}`);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Browse by category</h2>

      <div className={styles.grid}>
        {CATEGORIES.map(({ name, slug, icon: Icon }) => (
          <button
            type="button"
            key={slug}
            className={styles.card}
            onClick={() => handleCategoryClick(slug)}
          >
            <div className={styles.iconWrap}>
              <Icon sx={{ fontSize: 52 }} />
            </div>
            <p className={styles.categoryName}>{name}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
