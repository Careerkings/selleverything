import React, { useEffect, useState } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/header.css";
import { CartTotals } from "../redux/cartSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(CartTotals());
  }, [cartItems, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`product/search?query=${search.trim()}`);
  };

  return (
    <header>
      <Link to="/">
        <h1>sellEverything</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="header-search"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
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
