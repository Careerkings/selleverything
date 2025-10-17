import express from "express";
import {
  fetchProduct,
  insertProduct,
} from "../controllers/product.controller.js";

const productRoute = express.Router();

productRoute.post("/insert-product", insertProduct);
productRoute.get("/fetch-product", fetchProduct);

export default productRoute;
