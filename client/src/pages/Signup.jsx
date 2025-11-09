import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssfiles/signup.css";
import Oauth from "../components/Oauth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 6,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValid(validation);
    return Object.values(validation).every(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password || "")) {
      setError("Password must meet all requirements.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (err) {
      setLoading(false);
      if (err.message === "Failed to fetch" || !navigator.onLine) {
        err.message =
          "Could not connect to the server, please try again later.";
      }
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (e.target.id === "password") validatePassword(e.target.value);
  };

  return (
    <div id="signup-container">
      <div id="signup-div">
        <h1 id="signup-title">Join Us 🚀</h1>
        <form onSubmit={handleSubmit} id="signup-form">
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="username"
            onChange={handleChange}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPwd ? "text" : "password"}
              id="password"
              placeholder="Password"
              autoComplete="new-password"
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

          <div id="password-requirements">
            <p className={passwordValid.length ? "valid" : "invalid"}>
              • Minimum 6 characters
            </p>
            <p className={passwordValid.upper ? "valid" : "invalid"}>
              • At least one uppercase letter
            </p>
            <p className={passwordValid.lower ? "valid" : "invalid"}>
              • At least one lowercase letter
            </p>
            <p className={passwordValid.number ? "valid" : "invalid"}>
              • At least one digit
            </p>
            <p className={passwordValid.special ? "valid" : "invalid"}>
              • At least one special character
            </p>
          </div>

          <button disabled={loading}>
            {loading ? <p>Loading...</p> : <p>Signup</p>}
          </button>

          <Oauth />
        </form>

        <div>
          <span>Have an account?</span>
          <Link to="/signin">
            <span> Signin</span>
          </Link>
        </div>
        {error && (
          <p style={{ color: "#ffdddd", marginTop: "1rem" }} id="signup-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
