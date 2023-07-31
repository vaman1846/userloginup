import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [serverStatus, setServerStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState();

  console.log(userId);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const getLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const result = await response.json();
  
      setServerStatus(result.status);
      setUserId(result.data.userId);
      setIsLoggedIn(result.status);
  
      if (result.status) {
        alert("Login successful!");
        navigate("/ImageUpload", { state: result.data.userId }); // Use result.data.userId here
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={loginData.email}
        onChange={getLoginData}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={getLoginData}
      />
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>
        Don't have an account?{" "}
        <button className="link-btn" onClick={() => navigate("/Signup")}>
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;
