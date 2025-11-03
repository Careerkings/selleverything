import { useSelector } from "react-redux";
import { useState } from "react";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems, userId: currentUser._id }),
        }
      );

      const data = await res.json();
      console.log(data.url);

      if (data.url) {
        setLoading(false);
        window.location.href = data.url;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <button
        disabled={loading}
        onClick={handleCheckout}
        style={{
          backgroundColor: "#1E88E5",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer", // 👈 changes the cursor
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
          opacity: loading ? 0.7 : 1, // optional visual feedback
        }}
        onMouseOver={(e) => {
          if (!loading) e.target.style.backgroundColor = "#1565C0";
        }}
        onMouseOut={(e) => {
          if (!loading) e.target.style.backgroundColor = "#1E88E5";
        }}
      >
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
