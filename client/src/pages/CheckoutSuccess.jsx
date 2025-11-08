import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
    }, 10000);

    return () => clearTimeout(timer);
  }, [location, dispatch, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      {new URLSearchParams(location.search).get("success") === "true" ? (
        <>
          <h2>✅ Payment Successful! Thank you for your order.</h2>
          <div style={{ padding: "1rem" }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: "6px",
                textDecoration: "none",
                marginTop: "1rem",
                marginLeft: "1rem",
                transition: "background 0.3s ease",
                fontWeight: 500,
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <h2>❌ Payment Canceled. Your cart has been cleared.</h2>
      )}
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default CheckoutSuccess;
