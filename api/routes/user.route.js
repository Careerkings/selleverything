import express from "express";
import {
  changePassword,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const updateUserRouter = express.Router();

updateUserRouter.patch("/update-user/:id", verifyUser, updateUser);
updateUserRouter.delete("/delete-user/:id", verifyUser, deleteUser);
updateUserRouter.patch("/change-password/:id", verifyUser, changePassword);
updateUserRouter.get("/test/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ id: req.params.id });
});

export default updateUserRouter;
