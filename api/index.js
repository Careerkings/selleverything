import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import updateUserRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import stripeRouter from "./routes/stripe.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("✅ Mongoose connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeRouter
);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.DEPLOY_URL, process.env.CLIENT_URL]
    : [process.env.CLIENT_URL || "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", updateUserRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API is running in development"));
}


app.use((err, req, res, next) => {
  const isCastError = err.name === "CastError";
  const isValidationError = err.name === "ValidationError";
  const isDuplicateKey = err.code === 11000;

  const statusCode =
    isCastError || isValidationError || isDuplicateKey
      ? 400
      : err.statusCode || 500;

  const message = isCastError
    ? `Invalid ${err.path}: ${err.value}`
    : isValidationError
    ? Object.values(err.errors)
        .map((val) => val.message)
        .join(", ")
    : isDuplicateKey
    ? `Duplicate value, ${Object.keys(err.keyValue)} already exists.`
    : err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
