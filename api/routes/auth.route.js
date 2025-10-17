import express from "express";
import {
  googleAuth,
  logoutUser,
  signinAuth,
  signupAuth,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupAuth);
authRouter.post("/signin", signinAuth);
authRouter.post("/google", googleAuth);
authRouter.get("/logout", logoutUser);

export default authRouter;
