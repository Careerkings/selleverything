import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import updateUserRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import stripeRouter from "./routes/stripe.route.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongoose is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/stripe", stripeRouter);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.send("server is running");
});

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", updateUserRouter);
app.use("/api", orderRouter);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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

  const response = {
    success: false,
    message,
    statusCode,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  return res.status(statusCode).json(response);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`port is listening at ${PORT}`);
});
