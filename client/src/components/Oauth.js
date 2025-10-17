import React from "react";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userAuthSuccess } from "../redux/userslice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserLocalPersistence)
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;

      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, avatar: photoURL, name: displayName }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(userAuthSuccess(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button type="button" onClick={handleGoogleClick}>
      Continue with Google
    </button>
  );
};

export default Oauth;
