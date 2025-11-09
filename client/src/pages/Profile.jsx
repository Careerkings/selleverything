import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserPending,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserPending,
  logoutUserSuccess,
  updateUserFailure,
  updateUserPending,
  updateUserSuccess,
} from "../redux/userslice";
import "../cssfiles/profile.css";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { cleanupRedux } from "../utils/cleanupRedux";

const Profile = () => {
  const {
    currentUser,
    updateLoading,
    logoutLoading,
    deleteLoading,
    updateError,
    logoutError,
    deleteError,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [formData, setFormData] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFileURL(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserPending());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/user/update-user/${currentUser._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, avatar: fileURL }),
        }
      );
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message || "Update failed"));
        return;
      }
      dispatch(updateUserSuccess(data));
      console.log(data);
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    dispatch(deleteUserPending());
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/user/delete-user/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(deleteUserFailure(data.message || "Delete failed"));
        return;
      }
      dispatch(deleteUserSuccess());
      await cleanupRedux();
      navigate("/signin");
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleLogout = async () => {
    dispatch(logoutUserPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        dispatch(logoutUserFailure(data.message || "Logout failed"));
        return;
      }
      dispatch(logoutUserSuccess());
      await cleanupRedux();

      navigate("/signin");
    } catch (err) {
      dispatch(logoutUserFailure(err.message));
    }
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h2 className="profile-title">Your Profile</h2>

        <div className="profile-image-container">
          <img
            src={fileURL || currentUser?.avatar}
            alt="Profile"
            className="profile-avatar"
          />
          <label
            className="upload-label"
            onClick={() => fileRef.current.click()}
          >
            <FaCamera />
          </label>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <input
          type="text"
          name="username"
          className="profile-input"
          defaultValue={currentUser?.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />

        <input
          type="email"
          name="email"
          className="profile-input"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <button className="update-btn" type="submit" disabled={updateLoading}>
          {updateLoading ? "Updating..." : "Update Profile"}
        </button>

        <Link to="/change-password" className="change-password-link">
          Change Password
        </Link>

        <div className="action-row">
          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? "Logging out..." : "Logout"}
          </button>

          <button
            type="button"
            className="delete-account-btn"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>

        {successMsg && <p className="success">{successMsg}</p>}
        {updateError ? (
          <p className="error">{updateError}</p>
        ) : logoutError ? (
          <p className="error">{logoutError}</p>
        ) : deleteError ? (
          <p className="error">{deleteError}</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Profile;
