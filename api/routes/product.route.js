import express from "express";
import {
  fetchProduct,
  insertProduct,
  searchProduct,
} from "../controllers/product.controller.js";

const productRoute = express.Router();

productRoute.post("/insert-product", insertProduct);
productRoute.get("/fetch-product", fetchProduct);
productRoute.get("/search", searchProduct);

export default productRoute;
