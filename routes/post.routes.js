import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts
} from "../controllers/post.controller.js";

import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

/* Public Routes */
router.get("/", getAllPosts);
router.get("/my-posts", isAuth, getMyPosts);
router.get("/:id", getPostById);


/* Protected Routes */
router.post("/", isAuth, createPost);
router.put("/:id", isAuth, updatePost);
router.delete("/:id", isAuth, deletePost);

export default router;