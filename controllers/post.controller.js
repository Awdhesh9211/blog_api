import { Post } from "../models/post.model.js";
import ApiError from "../util/ApiError.js";
import asyncHandler from "../util/asyncHandler.js";


/* -----------------------------
   Create Post
------------------------------*/
export const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Post created",
      post
    });

  });


/* -----------------------------
   Get All Posts
------------------------------*/
export const getAllPosts =asyncHandler(async (req, res) => {

    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts
    });

  });


/* -----------------------------
   Get Single Post
------------------------------*/
export const getPostById =asyncHandler(async (req, res) => {
  
    const post = await Post.findById(req.params.id)
      .populate("user", "name email");

    if (!post) throw new ApiError(404, "Post not found");

    res.json({
      success: true,
      post
    });

  });


/* -----------------------------
   Update Post
------------------------------*/
export const updatePost =asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id);

    if (!post) throw new ApiError(404, "Post not found");


    // check ownership
    if (post.user.toString() !== req.user._id.toString()) throw new ApiError(403, "Not authorized to update this post");


    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();

    res.json({
      success: true,
      message: "Post updated",
      post: updatedPost
    });

  } );


/* -----------------------------
   Get Logged-in User Posts
------------------------------*/
export const getMyPosts =asyncHandler( async (req, res) => {

    const posts = await Post.find({ user: req.user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts
    });

  });

/* -----------------------------
   Delete Post
------------------------------*/
export const deletePost =asyncHandler( async (req, res) => {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this post"
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted"
    });

  });