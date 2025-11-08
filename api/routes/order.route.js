import express from "express";
import { orderCheckout } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/create-checkout-session", orderCheckout);

export default orderRouter;
