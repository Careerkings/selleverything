import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const signupAuth = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password) next(errorHandler(401, "provide valid details"));

    const existingEmail = await User.findOne({ email });
    if (existingEmail) next(errorHandler(409, "email alreay exist"));

    const hashPwd = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashPwd });
    await newUser.save();
    res
      .status(201)
      .json({ sucess: true, message: "user registered succesfully" });
  } catch (err) {
    next(err);
  }

  console.log(req.body);
};
