import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe
}  from "../controllers/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isAuth, getMe);

export default router;