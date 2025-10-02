import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

app.get("/api", (req, res) => {
  res.send("server is running");
});

app.listen(5000, () => {
  console.log("port is listening at 5000");
});
