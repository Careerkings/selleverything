import { react, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");
    const canceled = query.get("canceled");

    if (success === "true") {
      dispatch(clearCart());
      console.log("Checkout successful — cart cleared.");
    }

    if (canceled === "true") {
      dispatch(clearCart());
      console.log("Checkout canceled — cart cleared.");
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [location, dispatch, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {new URLSearchParams(location.search).get("success") === "true" ? (
        <h2>✅ Payment Successful! Thank you for your order.</h2>
      ) : (
        <h2>❌ Payment Canceled. Your cart has been cleared.</h2>
      )}
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default CheckoutSuccess;
