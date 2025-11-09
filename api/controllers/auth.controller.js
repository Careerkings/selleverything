import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

dotenv.config();

export const signupAuth = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required."));
    }
    email = email.trim().toLowerCase();
    username = username.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(errorHandler(400, "Invalid email format."));
    }
    const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return next(
        errorHandler(
          400,
          "Username must be 3–20 characters long and can only include letters, numbers, underscores, or periods."
        )
      );
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return next(
        errorHandler(
          400,
          "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character."
        )
      );
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(errorHandler(409, "Email already exists."));
    }
    const hashPwd = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashPwd });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (err) {
    next(err.message);
  }
};

export const signinAuth = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Email and password are required."));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found."));
    }
    const validPwd = await bcryptjs.compare(password, validUser.password);
    if (!validPwd) {
      return next(errorHandler(401, "Incorrect password."));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password: pwd, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
    console.log(token);
  } catch (err) {
    next(err.message);
  }
};

export const googleAuth = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, email, avatar } = req.body;
    const googleUser = await User.findOne({ email });
    if (googleUser) {
      const token = jwt.sign({ id: googleUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password: pwd, ...rest } = googleUser._doc;
      console.log(rest);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePwd =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPwd = await bcryptjs.hash(generatePwd, 10);
      const newUser = new User({
        email,
        avatar,
        password: hashPwd,
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password: pwd, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err.message);
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user logged out successfully");
  } catch (err) {
    next(err.message);
  }
};
