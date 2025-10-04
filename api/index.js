import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongoose is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("server is running");
});

app.use("/api", authRouter);

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

app.listen(5000, () => {
  console.log("port is listening at 5000");
});
