import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import ManIcon from "@mui/icons-material/Man";
import Jewelry from "@mui/icons-material/Diamond";
import WomanIcon from "@mui/icons-material/Woman";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        const capitalizedCategories = response.data.map(
          (category) => category.charAt(0).toUpperCase() + category.slice(1)
        );
        setCategories(capitalizedCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Electronics":
        return <PhoneIcon />;
      case "Jewelery":
        return <Jewelry />;
      case "Men's clothing":
        return <ManIcon />;
      case "Women's clothing":
        return <WomanIcon />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 1200,
        padding: "0 20px",
        paddingBottom: 100,
        borderTop: "1px solid grey",
        marginTop: 50,
        borderBottom: "1px solid grey",
        marginBottom: 50,
      }}
    >
      <h2
        variant="h2"
        style={{
          textAlign: "left",
          marginBottom: 40,
          marginTop: 60,
          fontSize: 50,
        }}
      >
        Browse By Category
      </h2>
      {loading ? (
        <Typography>Loading categories...</Typography>
      ) : (
        <Link to="/Products" style={{ textDecoration: "none" }}>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <Card
                  sx={{
                    border: "1px solid grey",
                    width: 200,
                    padding: "15px 30px;",
                    textAlign: "center",
                    transition: "0.3s",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f44336",
                      color: "white",
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "0.3s",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    {getCategoryIcon(category)}
                  </CardMedia>
                  <CardContent>
                    <Typography>{category}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Link>
      )}
    </div>
  );
};

export default Categories;
