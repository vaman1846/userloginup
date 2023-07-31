import React from "react";

const LikedImagesPage = ({ likedImages }) => {
  return (
    <div>
      <h2>Liked Images</h2>
      {likedImages.map((image) => (
        <div key={image._id}>
          <img src={image.image} alt="Liked Image" />
          <p>Likes: {image.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default LikedImagesPage;
