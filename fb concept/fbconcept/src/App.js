import React, { useState } from "react";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ImageUpload from "./components/ImageUpload";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./components/HomePage";
import LikedImagesPage from "./components/LikedImagesPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Handle successful login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/ImageGallery" /> : <Login onLogin={handleLogin} />}
          ></Route>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ImageUpload" element={<ImageUpload />} />
          <Route path="/Homepage" element={<HomePage/>}/>
        <Route exact path="/liked" component={LikedImagesPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
