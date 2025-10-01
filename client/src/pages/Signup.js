import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("", {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="email"
          autoComplete="email"
          onchange={handleChange}
          required
        />
        <input
          type="text"
          id="username"
          placeholder="username"
          autoComplete="username"
          onchange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
          onchange={handleChange}
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
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Signup;
