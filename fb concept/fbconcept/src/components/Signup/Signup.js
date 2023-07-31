import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    signupMessage: "",
  });

  console.log(navigate);

  const getSignupData = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const rawresult = await fetch("http://localhost:8000/user", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(signupData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const result = await rawresult.json();
      console.log(result);

      if (result.status) {
        // Signup was successful
        setSignupData({ ...signupData, signupMessage: "Signup success!" });
        alert("Signup success!");
        navigate("/");
      } else {
        // Signup failed, set the error message returned from the server
        setSignupData({ ...signupData, signupMessage: result.message });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSignupData({ ...signupData, signupMessage: "Signup failed. Please try again later." });
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <input
        name="name"
        type="text"
        placeholder="Username"
        value={signupData.name}
        onChange={getSignupData}
      />
      <input
        name="phone"
        type="text"
        placeholder="phone"
        value={signupData.phone}
        onChange={getSignupData}
      />
      <input
        name="email"
        type="text"
        placeholder="email"
        value={signupData.email}
        onChange={getSignupData}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={signupData.password}
        onChange={getSignupData}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?{" "}
        <button className="link-btn" onClick={() => navigate("/")}>
          Login
        </button>
      </p>
      {signupData.signupMessage && (
        <p className="signup-message">{signupData.signupMessage}</p>
      )}
    </div>
  );
};

export default Signup;
