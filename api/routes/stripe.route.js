import express from "express";
import { stripeWebHook } from "../controllers/order.controller.js";

const stripeRouter = express.Router();

stripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);

export default stripeRouter;
