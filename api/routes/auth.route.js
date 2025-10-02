import express from "express";
import { signupAuth } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupAuth);

export default authRouter;
