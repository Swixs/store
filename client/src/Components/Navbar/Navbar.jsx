import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const links = [
  { name: "Home", link: "/" },
  { name: "Contact", link: "/contact" },
  { name: "About", link: "/about" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          width: "99%",
          px: { xs: 0, sm: 0, md: 0, lg: 0 },
        }}
      >
        <Toolbar
          sx={{
            width: "95%",
            flexWrap: "wrap",
            justifyContent: "space-between",
            px: 0,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{ color: "#000", fontSize: "30px" }} />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              fontSize: { xs: "18px", sm: "22px", md: "24px" },
            }}
          >
            Exclusive
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 2,
              ml: { sm: 2, md: 10 },
            }}
          >
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                style={{
                  fontSize: "18px",
                  textDecoration: "none",
                  color: location.pathname === item.link ? "black" : "#000",
                  fontWeight: 200,
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            <IconButton size="large" onClick={() => navigate("/cart")}>
              <ShoppingCartIcon
                sx={{
                  color: "#000",
                  fontSize: { xs: "20px", sm: "25px", md: "30px" },
                }}
              />
            </IconButton>
            {currentUser ? (
              <>
                <IconButton size="large" onClick={() => navigate("/profile")}>
                  <AccountCircleIcon
                    sx={{
                      color: "#000",
                      fontSize: { xs: "20px", sm: "25px", md: "30px" },
                    }}
                  />
                </IconButton>
                <button
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    border: "none",
                    height: 30,
                    borderRadius: 10,
                    fontSize: "14px",
                    display: { xs: "none", md: "block" },
                    backgroundColor: "red",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  fontSize: "18px",
                  textDecoration: "none",
                  color: "#000",
                  fontWeight: 200,
                  marginLeft: 10,
                }}
              >
                Log in
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          {links.map((item) => (
            <ListItem
              button
              key={item.name}
              onClick={() => navigate(item.link)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
