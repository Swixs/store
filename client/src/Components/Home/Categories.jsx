import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import ManIcon from "@mui/icons-material/Man";
import Jewelry from "@mui/icons-material/Diamond";
import WomanIcon from "@mui/icons-material/Woman";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        console.error("Error loading categories:", error);
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

  const handleCategoryClick = (category) => {
    navigate(`/Products?category=${category.toLowerCase()}`);
  };

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 1200,
        padding: "0 90px",
        paddingBottom: 100,
        borderTop: "1px solid grey",
        marginTop: 50,
        borderBottom: "1px solid grey",
        marginBottom: 50,
      }}
    >
      <Box
        display="flex"
        justifyContent={{ xs: "center", sm: "flex-start" }}
        my={2.5}
      >
        <Typography variant="h5" fontWeight="bold">
          <Typography
            style={{ fontSize: "24px" }}
            component="span"
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Browse by category
          </Typography>
          <Typography
            style={{ fontSize: "24px" }}
            component="span"
            sx={{ display: { xs: "inline", sm: "none" } }}
          >
            Category
          </Typography>
        </Typography>
      </Box>

      {loading ? (
        <Typography>Loading categories...</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent={{ xs: "center", sm: "flex-start" }}
        >
          {categories.map((category, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Card
                sx={{
                  border: "1px solid grey",
                  width: { xs: "60%", sm: "60%", md: "40%", lg: "200px" },
                  padding: { xs: "10px 20px", sm: "15px 30px" },
                  textAlign: "center",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f44336",
                    color: "white",
                  },
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: { xs: 40, sm: 50 },
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
      )}
    </div>
  );
};

export default Categories;
