import { Component } from "react";
import {
  api_LoadAllCategories,
  api_LoadProductsByCategory,
  api_LoadAllProducts,
} from "../api/apiCalls";
import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";
import Header from "./Header";

//Function handles adding a product to the cart
const handleAddToCart = (product, qty = 1, navigate) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingIndex = cart.findIndex((item) => item.PID === product.PID);

  // If the product is already in the cart, update its quantity and total
  if (existingIndex !== -1) {
    cart[existingIndex].Qty = qty;
    cart[existingIndex].Total = (cart[existingIndex].Price * qty).toFixed(2);
  } else {
    // If the product is not in the cart, create a new item and add it
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

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));

  //Navigate function is provided, navigate to the cart page
  if (navigate) {
    navigate("/cart");
  }
};
// Main Categories component
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      selectedCategory: 0,
    };
  }

  //Called after the component is mounted to the DOM
  async componentDidMount() {
    await this.loadCategories();
    await this.loadAllProducts();
  }

  //Loads all categories from the API
  async loadCategories() {
    try {
      let response = await api_LoadAllCategories();
      let categories =
        typeof response === "string" ? JSON.parse(response) : response;
      categories.unshift({ CID: 0, CatName: "All Products" });
      this.setState({ categories });
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  }

  //Loads all products from the API
  async loadAllProducts() {
    try {
      let Obj = await api_LoadAllProducts();
      let parsedProducts = typeof Obj === "string" ? JSON.parse(Obj) : Obj;
      this.setState({ products: parsedProducts });
    } catch (error) {
      console.error("Failed to load all products:", error);
    }
  }

  // Handles a click event on a category item
  handleCategoryClick = async (cid) => {
    this.setState({ selectedCategory: cid, products: [] });

    try {
      // If All Products (CID 0) is clicked, load all products
      if (cid === 0) {
        await this.loadAllProducts();
      } else {
        //Load products for the specific category
        let response = await api_LoadProductsByCategory(cid);
        let products =
          typeof response === "string" ? JSON.parse(response) : response;
        this.setState({ products });
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  //UI
  render() {
    const { categories, products, selectedCategory } = this.state;
    return (
      <div>
        {/*Call Header */}
        <Header />
        <div className="categories-container">
          <h1>Categories</h1>
          <div className="categories-list">
            {categories.map((item) => (
              <div
                key={item.CID}
                onClick={() => this.handleCategoryClick(item.CID)}
                className={`category-item ${
                  selectedCategory === item.CID ? "selected" : ""
                }`}
              >
                {item.CatName}
              </div>
            ))}
          </div>
          {products.length > 0 && (
            <div className="products-section">
              <h2>{selectedCategory === 0 ? "All Products" : "Products"}</h2>
              <div className="products-list">
                {products.map((p) => (
                  <ProductCard key={p.PID} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// ProductCard is a functional component that displays a single product
function ProductCard({ product }) {
  const navigate = useNavigate();

  // Format the product price to a locale-specific currency string
  const formattedPrice = Number(product.Price).toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="product-item">
      <img src={product.ImageUrl} alt={product.ItemName} />
      <div className="product-info">
        <div className="product-name">
          <p>{product.ItemName}</p>
        </div>
        <div className="product-price">
          <p>Price: LKR {formattedPrice}</p>
        </div>
      </div>
      <div className="product-buttons">
        <button
          className="read-more-btn"
          onClick={() => navigate(`/product/${product.PID}`)}
        >
          Read More
        </button>
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product, 1, navigate)}
        >
          <i className="bi bi-cart"></i>
        </button>
      </div>
    </div>
  );
}

export default Categories;
