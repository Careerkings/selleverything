import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useLocation } from "react-router-dom";
import "../cssfiles/search.css";

const Search = () => {
  const [searchItems, setSearchItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/search?searchTerm=${query}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (page === 1) {
            setSearchItems(data.searchedProducts);
          } else {
            setSearchItems((prev) => [...prev, ...data.searchedProducts]);
          }
          setTotalPages(data.totalPages);
        })
        .catch((err) => console.error("Error fetching search results:", err))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, page]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleLoadMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div id="search-container">
      <h2 id="search-title">Search Results for “{query}”</h2>

      {loading && page === 1 ? (
        <p id="loading-spinner">Loading products...</p>
      ) : searchItems.length === 0 ? (
        <p id="error-text">No products found for “{query}”.</p>
      ) : (
        <div id="search-results">
          {searchItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      {loading && page > 1 && <p id="loading-spinner">Loading more...</p>}

      {!loading && page < totalPages && searchItems.length > 0 && (
        <button onClick={handleLoadMore} id="load-more-btn">
          Load More
        </button>
      )}

      {!loading && page >= totalPages && searchItems.length > 0 && (
        <p className="end-message">You’ve reached the end of the results.</p>
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
    <div className="search-card">
      <div className="search-img-container">
        <img src={images[imgIndex]} alt={product.name} className="search-img" />
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

      <h3 className="search-name">{product.name}</h3>
      <p className="search-price">₦{product.price}</p>
      <p className="search-category">{product.category}</p>
      <p className="search-stock">{product.stock} in stock</p>

      <button
        disabled={isAdded}
        className={`search-add-btn ${isAdded ? "added" : ""}`}
        onClick={() => onAddToCart(product)}
      >
        {isAdded ? "✔️ Added To Cart" : "🛒 Add to Cart"}
      </button>
    </div>
  );
};

export default Search;
