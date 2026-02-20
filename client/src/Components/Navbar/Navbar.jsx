import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Navbar.module.css";

const links = [
  { name: "Catalog", link: "/Products" },
  { name: "Contacts", link: "/Contact" },
  { name: "Discounts", link: "/#flash-sales", isAnchor: true },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setDrawerOpen(false);
    navigate("/");
    window.location.reload();
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon sx={{ fontSize: 28 }} />
        </button>

        <Link to="/" className={styles.logo}>
          PickNNBuy
        </Link>

        <div className={styles.navLinks}>
          {links.map((item) => {
            const isActive =
              !item.isAnchor &&
              (location.pathname === item.link ||
                (item.link === "/Products" && location.pathname.startsWith("/Product")));
            const isDiscountsActive =
              item.isAnchor && location.pathname === "/" && location.hash === "#flash-sales";
            return (
              <Link
                key={item.name}
                to={item.link}
                className={`${styles.navLink} ${isActive || isDiscountsActive ? styles.navLinkActive : ""}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Cart"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 28 }} />
          </button>
          {currentUser ? (
            <>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Profile"
                onClick={() => navigate("/Profile")}
              >
                <PersonOutlineRoundedIcon sx={{ fontSize: 28 }} />
              </button>
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        role="presentation"
        className={`${styles.drawerBackdrop} ${drawerOpen ? styles.drawerBackdropOpen : ""}`}
        onClick={closeDrawer}
        onKeyDown={(e) => e.key === "Escape" && closeDrawer()}
        aria-hidden={!drawerOpen}
      />
      <div
        className={`${styles.drawerPanel} ${drawerOpen ? styles.drawerPanelOpen : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </button>
        </div>
        {links.map((item) => {
          const isActive =
            !item.isAnchor &&
            (location.pathname === item.link ||
              (item.link === "/Products" && location.pathname.startsWith("/Product")));
          const isDiscountsActive =
            item.isAnchor && location.pathname === "/" && location.hash === "#flash-sales";
          return (
            <Link
              key={item.name}
              to={item.link}
              className={`${styles.drawerLink} ${isActive || isDiscountsActive ? styles.drawerLinkActive : ""}`}
              onClick={closeDrawer}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
