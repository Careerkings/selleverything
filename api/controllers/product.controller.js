import Product from "../models/product.model.js";
import products from "../product.js";

export const insertProduct = async (req, res, next) => {
  try {
    await Product.insertMany(products);
    res.status(201).json("products saved succesfully");
  } catch (err) {
    next(err.message);
  }
};

export const fetchProduct = async (req, res, next) => {
  try {
    const getFetch = await Product.find();
    res.status(200).json(getFetch);
  } catch (err) {
    next(err.message);
  }
};

export const searchProduct = async (req, res, next) => {
  const query = req.query.searchTerm;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const searchedProducts = await Product.find({
      $or: [
        {
          name: { $regex: query, $options: "i" },
        },
        { category: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      searchedProducts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err.message);
  }
};
