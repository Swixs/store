import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import AllProducts from "./Components/AllProducts/AllProducts";
import Registration from "./Components/SignUp/Registration";
import Login from "./Components/SignUp/Login";
import Footer from "./Components/Footer/Footer";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import Contact from "./Components/Contact/Contact";
import Cart from "./Components/Cart/Cart";
import { CartProvider } from "./Context/cardContext";
import Product from "./Components/Product/Product";
import Checkout from "./Components/Checkout/Checkout";
import About from "./Components/About/About";
import Profile from "./Components/Profile/Profile";
import { AuthProvider } from "./Context/authContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import { AlertsProvider } from "./Context/alertContext";

function App() {
  return (
    <AlertsProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar style={{ borderBottom: "1px solid grey" }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Products" element={<AllProducts />} />
              <Route path="/Product/:id" element={<Product />} />
              <Route path="/About" element={<About />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Wishlist" element={<Wishlist />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </AlertsProvider>
  );
}

export default App;
