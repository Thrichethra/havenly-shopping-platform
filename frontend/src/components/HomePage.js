import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  //navigation function
  const navigate = useNavigate();
  //login credentials stored in localStorage after save
  const LoginCredentials = localStorage.getItem("LoginCredentials");
  // Parse the JSON string from localStorage into an object
  const objCredentials = JSON.parse(LoginCredentials);

  //UI
  return (
    <div className="home-container">
      <div className="content-card">
        {/* Container for the text content on the left side of the card. */}
        <div className="text-content">
          {objCredentials.UserName && (
            <p className="greeting">Hello, {objCredentials.UserName}!</p>
          )}
          <p className="welcome-small">Welcome to Havenly</p>
          <h1 className="main-tagline">The Art of a Well Lived Space</h1>
          <p className="description">
            Find the perfect balance of function and style. Havenly is your
            destination for quality home goods and inspired living. Discover
            everything you need to make your house both beautiful and
            effortless.
          </p>
          <button
            onClick={() => navigate("/categories")}
            className="shop-button"
          >
            Start Shopping
          </button>
        </div>
        {/* Container for the image on the right side of the card. */}
        <div className="image-section">
          <img
            src="https://i.pinimg.com/1200x/e7/d8/dc/e7d8dcc4ecacb060976990245ed9cd46.jpg"
            alt="Modern interior with minimalist furniture and decor"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
