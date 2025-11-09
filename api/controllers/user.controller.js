import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.config.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "can only update own account"));

  try {
    const {} = req.body;
    if (req.body.avatar) {
      req.body.avatar = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "user_profiles",
      });
    }
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          avatar: req.body.avatar.url,
        },
      },
      { new: true }
    );
    const { password: pwd, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(err.message);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "can only delete own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user deleted successfully");
  } catch (err) {
    next(err.message);
  }
};

export const changePassword = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler, "can only update own password");

  const { currentPassword, newPassword } = req.body;

  try {
    const validUser = await User.findById(req.params.id);
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPwd = await bcryptjs.compare(
      currentPassword,
      validUser.password
    );
    if (!validPwd) return next(errorHandler(401, "wrong password"));

    const samePwd = await bcryptjs.compare(newPassword, validUser.password);
    if (samePwd)
      return next(
        errorHandler(401, "new password is thesame with current password")
      );
    const hashPwd = await bcryptjs.hash(newPassword, 10);
    validUser.password = hashPwd;
    validUser.save();
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password: pwd, ...rest } = validUser._doc;
    res
      .cookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err.message);
  }
};
