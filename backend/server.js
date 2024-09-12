import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.listen(port, () => console.log(`Server up and running on port ${port}.`));
