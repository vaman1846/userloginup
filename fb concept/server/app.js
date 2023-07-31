const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const multer = require("multer");

const Router = require("./src/Router/userRouter");

const path = require("path");
const cors = require('cors');

const userProfile = require("./src/model/image");

const PORT = process.env.PORT || 8000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },

  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5000000000,
  },
});

app.use("/image", express.static("./upload/images"));
app.post("/:userId/userProfile", upload.single("image"), async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;
    const file = req.file;
    

    let images = `/image/${file.filename}`;
    data.image = images;
    data.userId = userId;

    const userCreated = await userProfile.create(data);

    return res.status(201).send({
      // data: userCreated,
      message: "Image uploaded successfully",
      userId: userId,
      image: file.filename,
      userProfile: userCreated,
      imageId: userCreated._id,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,

      message: error.message,
    });
  }
});

// ................... app  get ..............

app.get("/image/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;

    // Assuming you have a method to retrieve the image URL based on the image ID
    const imageUrl = await userProfile(imageId);

    if (!imageUrl) {
      return res.status(404).send({
        status: false,
        message: "Image not found",
      });
    }

    return res.status(200).send({
      status: true,
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.send(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//===============================[ Get Image]===============================

app.get("/:userId/getImage", async (req, res) => {
  try {
    let body = req.query;

    let getImg = await userProfile.find(body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: getImg,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
});

// ..................... user like photo ..............

app.put(
  "/image/:imageId/like",
  (likeImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      // Find the image by ID
      const image = await userProfile.findById(imageId);

      if (!image) {
        return res.status(404).send({
          status: false,
          message: "Image not found",
        });
      }

      // Increment the likes
      image.likes += 1;
      await image.save();

      // Retrieve all images sorted by likes in descending order
      const images = await userProfile.find().sort({ likes: -1 });

      return res.status(200).send({
        status: true,
        message: "Image liked successfully",
        data: images,
      });
    } catch (error) {
      // res.send(error)
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    }
  })
);

mongoose
  .connect("mongodb://localhost:27017/userProfile")
  .then(() => {
    console.log("DB is connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

app.use("/", Router);
app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
