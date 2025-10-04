import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(process.env.REACT_APP_API_ENDPOINT);
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
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
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formData);
  };

  return (
    <div id="signup-container">
      <div id="signup-div">
        <h1 id="signup-title">Join Us 🚀</h1>
        <form onSubmit={handleSubmit} id="signup-form">
          <input
            type="email"
            id="email"
            placeholder="email"
            autoComplete="email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="username"
            placeholder="username"
            autoComplete="username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
            onChange={handleChange}
            required
          />
          <button disabled={loading}>
            {loading ? <p>Loading...</p> : <p>Signup</p>}
          </button>
        </form>
        <div>
          <span>Have an account?</span>
          <Link to="/signin">
            <span>Signin</span>
          </Link>
        </div>
        {error && <p id="signup-error">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
