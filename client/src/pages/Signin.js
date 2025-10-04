import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(process.env.REACT_APP_API_ENDPOINT);
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.message === "failed to fetch") {
        err.message = "could not connect to server";
        setError(err.message);
      } else {
        setError(err.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formData);
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
