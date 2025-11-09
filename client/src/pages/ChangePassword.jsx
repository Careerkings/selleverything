import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserPending,
  updateUserSuccess,
} from "../redux/userslice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../cssfiles/changePassword.css"; //

const ChangePassword = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState({
    currentPwd: false,
    newPwd: false,
    confirmPwd: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      dispatch(
        updateUserFailure("Confirm password does not match new password")
      );
      return;
    }

    try {
      dispatch(updateUserPending());
      const res = await fetch(
        `/api/user/change-password/${currentUser._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setPasswordMessage("Password updated successfully!");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div id="change-password-container">
      <div id="change-password-card">
        <h2 id="change-password-title">Change Password</h2>

        <form id="change-password-form" onSubmit={handleSubmit}>
          <div className="password-input-group">
            <input
              type={showPwd.currentPwd ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Current Password"
              id="currentPassword"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-toggle"
              aria-label="toggle current password visibility"
              onClick={() =>
                setShowPwd((prev) => ({
                  ...prev,
                  currentPwd: !prev.currentPwd,
                }))
              }
            >
              {showPwd.currentPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-input-group">
            <input
              type={showPwd.newPwd ? "text" : "password"}
              autoComplete="new-password"
              placeholder="New Password"
              id="newPassword"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-toggle"
              aria-label="toggle new password visibility"
              onClick={() =>
                setShowPwd((prev) => ({ ...prev, newPwd: !prev.newPwd }))
              }
            >
              {showPwd.newPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-input-group">
            <input
              type={showPwd.confirmPwd ? "text" : "password"}
              autoComplete="confirm-password"
              placeholder="Confirm Password"
              id="confirmPassword"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="eye-toggle"
              aria-label="toggle confirm password visibility"
              onClick={() =>
                setShowPwd((prev) => ({
                  ...prev,
                  confirmPwd: !prev.confirmPwd,
                }))
              }
            >
              {showPwd.confirmPwd ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button id="change-password-btn" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>

        {passwordMessage && (
          <p className="success-message">{passwordMessage}</p>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
