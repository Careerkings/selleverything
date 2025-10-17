import Product from "../models/product.model.js";
import products from "../product.js";

export const insertProduct = async (req, res, next) => {
  try {
    await Product.insertMany(products);
    res.status(201).json("products saved succesfully");
  } catch (err) {
    next(err);
  }
};

export const fetchProduct = async (req, res, next) => {
  try {
    const getFetch = await Product.find();
    res.status(200).json(getFetch);
  } catch (err) {
    next(err);
  }
};
