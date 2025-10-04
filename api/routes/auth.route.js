import express from "express";
import { signinAuth, signupAuth } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupAuth);
authRouter.post("/signin", signinAuth);

export default authRouter;
