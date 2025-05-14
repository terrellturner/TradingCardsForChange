import path from "path";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { log } from "console";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS URLs
});

// multer setup (in-memory storage)
const storage = multer.memoryStorage(); // Store file in memory

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded." });
    }

    // Create a readable stream from the buffer
    const stream = Readable.from(req.file.buffer);

    // Upload the stream to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" }, // Specify resource type
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res
            .status(500)
            .send({ message: "Upload failed", error: error.message });
        }

        // Success! Send back the Cloudinary URL
        res.status(200).send({
          message: "Image uploaded successfully",
          image: result.secure_url, // Use secure_url for HTTPS
          public_id: result.public_id, //  Good practice to include
        });
      }
    );

    stream.pipe(uploadStream);
  });
});

export default router;
