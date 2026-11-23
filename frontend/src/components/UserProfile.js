import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UserProfile.css";

// The UserProfile component
function UserProfile({ isOpen, onClose }) {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  // useEffect hook to fetch user data when the modal is opened
  useEffect(() => {
    if (!isOpen) return;

    // Retrieve the user's login credentials from local storage
    const savedCustomer = JSON.parse(localStorage.getItem("LoginCredentials"));
    if (savedCustomer) {
      setCustomer(savedCustomer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Function to handle the user logout process
  const handleLogout = () => {
    localStorage.removeItem("LoginCredentials");
    localStorage.removeItem("cart");

    window.dispatchEvent(new StorageEvent("storage", { key: "cart" }));

    // Navigate the user to the login page
    navigate("/LoginPage");
  };

  // If no customer data is found in local storage, display a simple message
  if (!customer) {
    return (
      <div className="profile-overlay">
        <div className="profile-content">
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <p>No user details found.</p>
        </div>
      </div>
    );
  }

  //If user found show these details
  return (
    <div className="profile-overlay">
      <div className="profile-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h2>{customer.UserName}</h2>
        <i className="bi bi-person-circle user-profile"></i>
        <p>
          <span>{customer.UserName} ID NO :</span> {customer.CSID}
        </p>
        <p>
          <span>Username :</span> {customer.UserName}
        </p>
        <p>
          <span>First Name :</span> {customer.FirstName}
        </p>
        <p>
          <span>Address :</span> {customer.Address}
        </p>
        <p>
          <span>Contact Number :</span> {customer.Contact}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserProfile;
