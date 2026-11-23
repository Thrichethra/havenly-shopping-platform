import { useState, useEffect } from "react";
import "../styles/cart.css";
import Header from "./Header";
import { api_SaveInvoice } from "../api/apiCalls";

export default function Cart() {
  // State for storing the cart items
  const [cart, setCart] = useState([]);
  // State for storing the total price
  const [totalPrice, setTotalPrice] = useState(0);

  // useEffect to load the cart from local storage when the component mounts.
  useEffect(() => {
    // Function to load the cart from local storage.
    const loadCart = () => {
      // Get cart data from local storage, default to an empty array if none exists
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
      // Calculate the total price of all items in the cart
      const newTotal = savedCart.reduce(
        (sum, item) => sum + parseFloat(item.Total),
        0
      );
      setTotalPrice(newTotal);
    };
    loadCart();
    // The empty array `[]` ensures this effect runs only once.
  }, []);

  // Updates the cart in both the component state and local storage.
  const updateCart = (updatedCart) => {
    // Reassigns LineId to each item
    updatedCart = updatedCart.map((item, index) => ({
      ...item,
      LineId: index + 1,
    }));
    // Save the updated cart to local storage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Update the component's state with the new cart
    setCart(updatedCart);
    // Update the totalPrice
    const newTotal = updatedCart.reduce(
      (sum, item) => sum + parseFloat(item.Total),
      0
    );
    setTotalPrice(newTotal);
  };

  // Handles removing an item from the cart.
  const handleRemove = (pid) => {
    const updatedCart = cart.filter((item) => item.PID !== pid);
    updateCart(updatedCart);
  };

  // Completely clears the cart.
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setTotalPrice(0);
  };

  // handleCheckout function
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("LoginCredentials"));
    if (!user || !user.CSID) {
      alert("Please log in to proceed to checkout.");
      return;
    }

    // Construct the data for the invoice
    const checkoutData = {
      CSID: user.CSID,
      Total: totalPrice,
      lstInvProduct: cart.map((item) => ({
        LineId: item.LineId,
        PID: item.PID,
        Qty: item.Qty,
        Price: item.Price,
        Total: item.Total,
      })),
    };

    // Only proceed if the cart is not empty
    if (totalPrice > 0) {
      // Call the API to save the invoice
      const response = await api_SaveInvoice(checkoutData);

      if (response && response.newInvoiceId > 0) {
        alert(
          `Order Placed Successfully! Invoice ID: ${response.newInvoiceId}`
        );
        localStorage.removeItem("cart");
        setTotalPrice(0);
        setCart([]);
      } else {
        alert("Failed");
      }
    } else {
      alert("Cannot Place order. Cart is empty!");
    }
  };

  // Format price helper
  const formatPrice = (value) => {
    return Number(value).toLocaleString("en-LK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Total Price
  const getTotal = () => {
    return formatPrice(totalPrice);
  };

  // Displays a message if the cart is empty.
  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="cart-page">
          <h2>
            <i className="bi bi-cart"></i> Cart is empty
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="cart-page">
        <h2>
          <i className="bi bi-cart"></i> My Cart
        </h2>

        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.PID}>
              <img src={item.ImageUrl} alt={item.Name} />
              <div className="cart-details">
                <h3>{item.Name}</h3>
                <p>Price: LKR {formatPrice(item.Price)}</p>
                <p>Item Total: LKR {formatPrice(item.Total)}</p>
              </div>
              <div className="qty-controls">
                <span className="qty-value">{item.Qty}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.PID)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">Total: LKR {getTotal()}</div>
          <button className="clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
