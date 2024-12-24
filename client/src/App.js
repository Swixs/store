import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import AllProducts from "./Components/AllProducts/AllProducts";
import Registration from "./Components/SignUp/Registration";
import Login from "./Components/SignUp/Login";

function Contact() {
  return <h1>Contact Page</h1>;
}

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
      </Routes>
    </Router>
  );
}

export default App;
