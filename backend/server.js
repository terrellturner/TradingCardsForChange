import path from "path";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  notFound,
  errorHandler,
  ipFilter,
} from "./middleware/errorMiddleware.js";
import { log } from "console";

const port = process.env.PORT || 5000;

const app = express();

//Cookie parser middleware
app.use(cookieParser());

app.use(errorHandler);

connectDB();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://tc4c-backend.vercel.app",
      "https://trading-cards-for-change.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(ipFilter);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

app.get("/", (req, res) => {
  res.send("🤷");
});

app.use(notFound);

export default app;
