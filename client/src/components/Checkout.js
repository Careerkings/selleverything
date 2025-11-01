import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  const handleCheckout = async () => {
    try {
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
        window.location.href = data.url;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <button
        onClick={handleCheckout}
        style={{
          backgroundColor: "#1E88E5",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1565C0")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#1E88E5")}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
