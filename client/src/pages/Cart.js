import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  CartTotals,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "../redux/cartSlice";
import Checkout from "../components/Checkout";
import "../cssfiles/cart.css";

const Cart = () => {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const handleAddToCart = (cartItem) => dispatch(addToCart(cartItem));
  const handleRemoveFromCart = (cartItem) => dispatch(removeFromCart(cartItem));
  const handleDecreaseCart = (cartItem) => dispatch(decreaseCart(cartItem));
  const handleClearCart = () => dispatch(clearCart());

  useEffect(() => {
    dispatch(CartTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <Link to="/" className="btn-continue">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span className="total">Total</span>
          </div>

          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <div key={cartItem._id} className="cart-item">
                <div className="cart-product">
                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    className="cart-img"
                  />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p className="cart-desc">{cartItem.desc}</p>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-price">₦{cartItem.price}</div>

                <div className="cart-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecreaseCart(cartItem)}
                  >
                    −
                  </button>
                  <span>{cartItem.cartQuantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleAddToCart(cartItem)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-total">
                  ₦{cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <button className="btn-clear" onClick={handleClearCart}>
              Clear Cart
            </button>

            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="subtotal-amount">₦{cartTotalAmount}</span>
              </div>
              <div className="checkout-continue">
                <Checkout cartItems={cartItems} />

                <Link to="/" className="btn-continue">
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
