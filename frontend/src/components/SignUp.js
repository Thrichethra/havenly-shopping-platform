import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_SaveCustomer } from "../api/apiCalls";
import "../styles/SignUp.css";

// The SignUp component
function SignUp() {
  const navigate = useNavigate();
  // State to manage the form data (input values)
  const [formData, setFormData] = useState({
    firstName: "",
    address: "",
    contact: "",
    username: "",
    password: "",
  });

  //store validation errors for each form field
  const [errors, setErrors] = useState({});

  //Handler for input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for the signup button click
  const handleSignUp = async () => {
    const { firstName, address, contact, username, password } = formData;
    const newErrors = {};

    //  Validation Logic
    // Check if first name is empty
    if (!firstName) {
      newErrors.firstName = "First name is required.";
    }
    // Check if address is empty
    if (!address) {
      newErrors.address = "Address is required.";
    }

    // Validate the contact number
    if (!contact || isNaN(contact) || contact.toString().length < 8) {
      newErrors.contact = "A valid contact number is required.";
    }

    // Check if username is empty.
    if (!username) {
      newErrors.username = "Username is required.";
    }

    // Validate the password based on specific criteria
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain an uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain a number.";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      newErrors.password = "Password must contain a special character.";
    }

    // Update the errors with newErrors object
    setErrors(newErrors);

    // If there are any errors, stop the function execution
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If validation passes, attempt to save the customer data to the backend
    try {
      const response = await api_SaveCustomer(
        firstName,
        address,
        parseInt(contact),
        username,
        password
      );

      // Display the response from the API
      alert(response);
      if (response !== "Username already exists.") {
        navigate("/loginPage");
      }
    } catch (error) {
      // Catch and log any errors that occur during the API call
      console.error(error);
      alert("Error saving user!");
    }
  };

  //UI
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        {/* First Name input group */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className="form-control"
            onChange={handleChange}
          />
          {/* Display error message if `errors.firstName` exists. */}
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </div>
        {/* Address input group */}
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            className="form-control"
            onChange={handleChange}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        {/* Contact input group */}
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="number"
            name="contact"
            value={formData.contact}
            className="form-control"
            onChange={handleChange}
          />
          {errors.contact && <p className="error-message">{errors.contact}</p>}
        </div>
        {/* Username input group */}
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            className="form-control"
            onChange={handleChange}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>
        {/* Password input group */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="form-control"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        {/* Sign Up button */}
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
