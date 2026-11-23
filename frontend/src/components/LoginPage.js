import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api_ValidateCustomer } from "../api/apiCalls";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Handle error
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and Password are required.");
      return;
    }

    try {
      //Calls backend API with the given username & password and pause at that line until api_ReadCustomer finishes and gives the result
      const response = await api_ValidateCustomer(username, password);

      //Convert String into JSON Object
      const parsedResponse =
        typeof response === "string" ? JSON.parse(response) : response;
      console.log("Parsed response:", parsedResponse);

      //Validation Steps
      if (!parsedResponse || !parsedResponse.UserName) {
        setError("Invalid username or password.");
        return;
      }

      //Save to Local Storage
      localStorage.setItem("LoginCredentials", JSON.stringify(parsedResponse));
      console.log("Customer details:", parsedResponse);

      //Navigate to homepage
      navigate("/homePage");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  //UI Part
  return (
    <div className="LoginScreen">
      <div className="LoginBox">
        {/*Heading*/}
        <h1>LOGIN</h1>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}
        <div className="login-button">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="signup-row">
          <p>Don't have an account?</p>
          <button onClick={() => navigate("/Signup")}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
