// import React, { useState } from "react";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
// import ImageGallery from "./components/ImageGallery";
// import UploadImage from "./components/UploadImage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import cors from 'cors' ;
// import ImageUploadForm from "./components/ImageUploadForm";

// const App = () => {
  

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Login/>}></Route>
//           <Route path='/Signup' element={<Signup/>}></Route>
//           <Route path='/UploadImage' element={<UploadImage/>}></Route>
//           <Route path='/UploadImage' element={<UploadImage  />}></Route>
//          <Route path='/ImageGallery' element={<ImageGallery />} />
//          <Route path='/Image' element={<ImageUploadForm/>}></Route>

//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// // import React, { useState } from "react";
// // import Signup from "./components/Signup/Signup";
// // import Login from "./components/Login/Login";
// // import UploadImage from "./components/UploadImage";
// // import ImageGallery from "./components/ImageGallery";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // const App = () => {
// //   const [imageUploaded, setImageUploaded] = useState(false);

// //   const handleImageUpload = () => {
// //     setImageUploaded(true);
// //   };

// //   return (
// //     <div>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/" element={<Login />}></Route>
// //           <Route path="/Signup" element={<Signup />}></Route>
// //           <Route
// //             path="/UploadImage"
// //             element={<UploadImage onImageUpload={handleImageUpload} />}
// //           ></Route>

// //           <Route path="/ImageGallery" element={<ImageGallery />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </div>
// //   );
// // };

// // export default App;




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
