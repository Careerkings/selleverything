import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/signin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userAuthFailure,
  userAuthPending,
  userAuthSuccess,
} from "../redux/userslice";
import Oauth from "../components/Oauth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userAuthPending());
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok || data.success === false) {
        dispatch(userAuthFailure(data.message || "Signin failed."));
        return;
      }
      console.log("its a success");
      dispatch(userAuthSuccess(data));
      console.log(loading);
      navigate("/");
    } catch (err) {
      if (err.message === "Failed to fetch" || !navigator.onLine) {
        err.message = "Could not connect to server. Please try again later.";
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
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPwd ? "text" : "password"}
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPwd((prev) => !prev)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button disabled={loading}>
            {loading ? <p>Loading...</p> : <p>Signin</p>}
          </button>

          <Oauth />
        </form>

        <div>
          <span>Don’t have an account?</span>
          <Link to="/signup">
            <span> Signup</span>
          </Link>
        </div>

        {error && (
          <p style={{ color: "#ffdddd", marginTop: "1rem" }} id="signin-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signin;
