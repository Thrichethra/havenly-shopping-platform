import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ProductDetailsPage from "./components/ProductDetailsPage";
import SignUp from "./components/SignUp";
import Categories from "./components/Categories";
import Cart from "./components/cart";
import UserProfile from "./components/UserProfile";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:pid" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
