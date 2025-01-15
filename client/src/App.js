import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import AllProducts from "./Components/AllProducts/AllProducts";
import Registration from "./Components/SignUp/Registration";
import Login from "./Components/SignUp/Login";
import Footer from "./Components/Footer/Footer";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import Contact from "./Components/Contact/Contact";

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <Router>
      <Navbar style={{ borderBottom: "1px solid grey" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products" element={<AllProducts />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignUp" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
