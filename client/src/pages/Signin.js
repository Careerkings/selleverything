import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/signin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userAuthFailure,
  userAuthPending,
  userAuthSuccess,
} from "../redux/userslice";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userAuthPending(true));
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.text();
      console.log(data);
      console.log(currentUser);
      if (!res.ok || data.success === false) {
        dispatch(userAuthFailure(data.message));
        return;
      }
      dispatch(userAuthSuccess(data));
      navigate("/");
    } catch (err) {
      if (err.message === "Failed to fetch" || !navigator.onLine) {
        err.message = "could not connect to server, try again later";
      }
      dispatch(userAuthFailure(err.message));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div id="signin-container">
      <div id="signin-div">
        <h1 id="signin-title">Welcome Back 🚀</h1>
        <form onSubmit={handleSubmit} id="signin-form">
          <input
            type="email"
            id="email"
            placeholder="email"
            autoComplete="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
          <button disabled={loading}>
            {loading ? <p>Loading...</p> : <p>Signin</p>}
          </button>
        </form>
        <div>
          <span>Dont have an account?</span>
          <Link to="/signup">
            <span>Signup</span>
          </Link>
        </div>
        {error && <p id="signin-error">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
