import React from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../cssfiles/header.css";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header>
      <Link to="/home">
        {" "}
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
        <Link to="/cart">
          <FaCartPlus />
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
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
