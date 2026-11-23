import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Welcome.css";

function Welcome() {
  //navigation function
  const navigate = useNavigate();

  //useEffect runs after the component mounts
  useEffect(() => {
    //timer to automatically redirect after 4 seconds
    const timer = setTimeout(() => {
      // Navigate to the login page
      navigate("/loginPage");
    }, 4000);

    //clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome">
      {/* Website title */}
      <h1>Havenly</h1>
      {/* Tagline for the website */}
      <p>Bring comfort & style to your home</p>
    </div>
  );
}

export default Welcome;
