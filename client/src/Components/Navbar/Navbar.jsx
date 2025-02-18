import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import { useAlerts } from "../../Context/alertContext";

const links = [
  { name: "Home", link: "/" },
  { name: "Contact", link: "/contact" },
  { name: "About", link: "/about" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#000", 0.15),
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: "auto",
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
  const { alerts } = useAlerts();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };
  const unreadCount = alerts.filter((alert) => !alert.read).length;
  const numberMessages = unreadCount > 9 ? "9+" : unreadCount;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", padding: "10px 180px" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          >
            Exclusive
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", gap: 2, ml: 10 }}>
            {links.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                style={{
                  fontSize: "20px",
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
          <Search>
            <StyledInputBase
              placeholder="What are you looking for?"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Link to="/wishlist">
              <IconButton size="large" color="inherit">
                <Badge badgeContent={numberMessages} color="error">
                  <MailIcon sx={{ color: "#000" }} />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge color="error">
                <ShoppingCartIcon sx={{ color: "#000" }} />
              </Badge>
            </IconButton>
            {currentUser ? (
              <>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => navigate("/Profile")}
                >
                  <AccountCircleIcon sx={{ color: "#000" }} />
                </IconButton>
                <button
                  onClick={handleLogout}
                  style={{ color: "black", marginLeft: "20px" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "#000",
                  fontWeight: 200,
                  marginLeft: 20,
                }}
              >
                Log in
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
