import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./pages/ChangePassword";
import { ToastContainer } from "react-toastify";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

const App = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div>
      <ToastContainer />
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
