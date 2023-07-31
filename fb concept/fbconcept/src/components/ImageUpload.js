import React, { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";



const ImageUpload = () => {
  const location = useLocation();
  const userId = location.state;

  console.log(userId);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const navigate= useNavigate()

  const handleImageUpload = async () => {
    if (!selectedImage || !userId) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch(`http://localhost:8000/${userId}/userProfile`, {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      if (response.ok) {

        setUploadMessage("Image uploaded successfully");

        setSelectedImage(null);

        
        setTimeout(() => {
          navigate("/Homepage");
        }, 2000); 
      } else {
        setUploadMessage("Failed to upload image");
      }

   
      setSelectedImage(null);
    } catch (error) {
      console.error("Error:", error);
      setUploadMessage("Failed to upload image");
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input
        type="file"
        onChange={(e) => setSelectedImage(e.target.files[0])} 
        name="selectedImage"
      />
      <button onClick={handleImageUpload}>Upload </button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default ImageUpload;
