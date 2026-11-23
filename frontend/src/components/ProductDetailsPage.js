import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api_LoadProductDetails } from "../api/apiCalls";
import "../styles/ProductDetailsPage.css";
import Header from "./Header";

//Helper function to format a numeric value
const formatPrice = (value) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
  }).format(value);
};

// The main component for displaying product details
export default function ProductDetailsPage() {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  // useEffect to fetch product details when the component mounts or when the `pid` changes
  useEffect(() => {
    const fetchProduct = async () => {
      const productId = parseInt(pid, 10);
      let response = await api_LoadProductDetails(productId);
      let productDetails =
        typeof response === "string" ? JSON.parse(response) : response;
      setProduct(productDetails);

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.PID === productId);
      if (existingItem) setQty(existingItem.Qty);
    };
    fetchProduct();
  }, [pid]);

  // Function to handle adding or updating a product in the cart
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.PID === product.PID);

    // If the product is already in the cart, update its quantity and total price
    if (existingIndex !== -1) {
      cart[existingIndex].Qty = qty;
      cart[existingIndex].Total = (cart[existingIndex].Price * qty).toFixed(2);
      // If the product is new, create a new item object and add it to the cart
    } else {
      const newItem = {
        LineId: cart.length + 1,
        PID: product.PID,
        Qty: qty,
        Name: product.ItemName,
        Category: product.CatName,
        Price: product.Price,
        Total: (product.Price * qty).toFixed(2),
        ImageUrl: product.ImageUrl,
      };
      cart.push(newItem);
    }

    // Save the updated cart array back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));
    navigate("/cart");
  };

  // If the product data is not yet loaded, display a "Loading..." message
  if (!product) return <div>Loading...</div>;

  //UI
  return (
    <div>
      <Header />
      <div className="product-details-page">
        <h1>{product.ItemName}</h1>
        <img src={product.ImageUrl} alt={product.ItemName} />

        {/* Display the formatted price. */}
        <div>Price: {formatPrice(product.Price)}</div>

        {/* Display the product description. */}
        <p>{product.Details}</p>

        {/* Quantity control section. */}
        <div className="quantity-container">
          <button onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}>
            -
          </button>
          <span>{qty}</span>
          <button onClick={() => setQty((prev) => prev + 1)}>+</button>
        </div>

        {/* "Add to Cart" button that triggers the `handleAddToCart` function. */}
        <button
          className="cart-button"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
