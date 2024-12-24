import React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";

const links = [
  { name: "Home", link: "/" },
  { name: "Contact", link: "/Contact" },
  { name: "About", link: "/About" },
  { name: "Sign up", link: "/SignUp" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#000", 0.15),
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Navbar() {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", padding: "10px 180px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Exclusive
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: "20px",
              marginLeft: "200px",
            }}
          >
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: location.pathname === item.link ? "black" : "#000",
                  fontWeight: "200",
                  marginLeft: 20,
                  borderBottom:
                    location.pathname === item.link
                      ? "1px solid black"
                      : "none",
                }}
              >
                {item.name}
              </Link>
            ))}
          </Box>
          <Search>
            <StyledInputBase
              placeholder="What are you looking for?"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon style={{ color: "#000" }} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={7} color="error">
                <ShoppingCartIcon style={{ color: "#000" }} />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
