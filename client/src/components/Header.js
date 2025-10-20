import React, { useEffect } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../cssfiles/header.css";
import { CartTotals } from "../redux/cartSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CartTotals());
  }, [cartItems, dispatch]);

  return (
    <header>
      <Link to="/">
        <h1>sellEverything</h1>
      </Link>
      <form>
        <input
          type="search"
          id="header-search"
          placeholder="search...
        "
        />
        <FaSearch />
      </form>
      <div>
        <div>
          <Link to="/cart">
            <FaCartPlus />
          </Link>
          {cartTotalQuantity > 0 ? cartTotalQuantity : ""}
        </div>

        <Link to="/profile">
          {currentUser?._id ? (
            <img src={currentUser.avatar} alt={currentUser.username} />
          ) : (
            <p> Signin</p>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
