import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productFetchFailure,
  productFetchPending,
  productFetchSuccess,
} from "../redux/productslice";
import "../cssfiles/home.css";
import { addToCart } from "../redux/cartSlice";

const Home = () => {
  const { products, loading, error } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const [gridMode, setGridMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(productFetchPending());
        const res = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/product/fetch-product`
        );
        const data = await res.json();
        if (!res.ok || data.success === false) {
          dispatch(productFetchFailure(data.message));
          return;
        }
        dispatch(productFetchSuccess(data));
      } catch (err) {
        if (err.message === "Failed to fetch" || !navigator.onLine) {
          err.message = "Could not get the products, try again later";
        }
        dispatch(productFetchFailure(err.message));
      }
    };
    fetchProduct();
  }, [dispatch]);

  const nextSlide = () => {
    if (products.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (products.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!gridMode && products.length > 1) {
      intervalRef.current = setInterval(nextSlide, 5000);
      return () => clearInterval(intervalRef.current);
    }
  }, [products, gridMode]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    clearInterval(intervalRef.current);
  };

  const toggleView = () => {
    setGridMode((prev) => !prev);
    clearInterval(intervalRef.current);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div id="home-container">
      <h2 id="home-title">Our Products</h2>
      <div id="home-header">
        <button id="toggle-view-btn" onClick={toggleView}>
          Switch View Mode
        </button>
      </div>

      {loading ? (
        <p id="loading-text">Loading products...</p>
      ) : error ? (
        <p id="error-text">{error}</p>
      ) : (
        <>
          {products?.length > 0 ? (
            gridMode ? (
              <div id="grid-container">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    cartItems={cartItems}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div id="carousel-container">
                <div id="carousel-track" ref={trackRef}>
                  {products.map((product) => (
                    <CarouselItem
                      key={product._id}
                      product={product}
                      cartItems={cartItems}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                <button id="carousel-prev" onClick={prevSlide}>
                  &#10094;
                </button>
                <button id="carousel-next" onClick={nextSlide}>
                  &#10095;
                </button>
                <div id="carousel-indicators">
                  {products.map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-dot ${
                        index === currentIndex ? "active" : ""
                      }`}
                      onClick={() => goToSlide(index)}
                    ></div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <p id="error-text">No products available.</p>
          )}
        </>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, cartItems }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const isAdded = cartItems.some((item) => item._id === product._id);

  const images = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl];

  const nextImage = () =>
    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () =>
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="grid-card">
      <div className="grid-img-container">
        <img src={images[imgIndex]} alt={product.name} />
        {images.length > 1 && (
          <>
            <button className="grid-prev" onClick={prevImage}>
              &#10094;
            </button>
            <button className="grid-next" onClick={nextImage}>
              &#10095;
            </button>
          </>
        )}
      </div>
      <h3>{product.name}</h3>
      <p className="price">₦{product.price}</p>
      <p>{product.category}</p>
      <p>{product.stock} in stock</p>
      <button
        disabled={isAdded}
        className={`add-to-cart ${isAdded ? "added" : ""}`}
        onClick={() => onAddToCart(product)}
      >
        {isAdded ? "✔️ Added To Cart" : "🛒 Add to Cart"}
      </button>
    </div>
  );
};

const CarouselItem = ({ product, onAddToCart, cartItems }) => {
  const isAdded = cartItems.some((item) => item._id === product._id);

  return (
    <div className="carousel-item">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₦{product.price}</p>
      <p>{product.category}</p>
      <p>{product.stock} in stock</p>
      <p>{product.description}</p>
      <button
        disabled={isAdded}
        className={`add-to-cart ${isAdded ? "added" : ""}`}
        onClick={() => onAddToCart(product)}
      >
        {isAdded ? "✔️ Added To Cart" : "🛒 Add to Cart"}
      </button>
    </div>
  );
};

export default Home;
