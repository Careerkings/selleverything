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

app.listen(5000, () => {
  console.log("port is listening at 5000");
});
