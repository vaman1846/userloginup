import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import the Link component

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images data from the server
    const fetchImages = async () => {
      try {
        const response = await axios.get("/images");
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const handleLike = async (imageId) => {
    try {
      // Send like request to the server
      await axios.put(`/image/${imageId}/like`);
      // Fetch updated images data from the server
      const response = await axios.get("/images");
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Sort images based on the number of likes in descending order
  const sortedImages = images.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Homepage</h2>
      {sortedImages.map((image) => (
        <div key={image._id}>
          <img src={image.image} alt="Image" />
          <p>Likes: {image.likes}</p>
          <button onClick={() => handleLike(image._id)}>Like</button>
        </div>
      ))}
      {/* Link to the LikedImagesPage */}
      <Link to="/liked">Show Liked Images</Link>
    </div>
  );
};

export default HomePage;
