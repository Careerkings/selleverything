import express from "express";
import {
  orderCheckout,
  stripeWebHook,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", orderCheckout);
orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);

export default orderRouter;
