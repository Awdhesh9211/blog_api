import { Post } from "../models/post.model.js";


/* -----------------------------
   Create Post
------------------------------*/
export const createPost = async (req, res) => {
  try {
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* -----------------------------
   Get All Posts
------------------------------*/
export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* -----------------------------
   Get Single Post
------------------------------*/
export const getPostById = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id)
      .populate("user", "name email");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.json({
      success: true,
      post
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* -----------------------------
   Update Post
------------------------------*/
export const updatePost = async (req, res) => {
  try {

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
        message: "Not authorized to update this post"
      });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();

    res.json({
      success: true,
      message: "Post updated",
      post: updatedPost
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* -----------------------------
   Get Logged-in User Posts
------------------------------*/
export const getMyPosts = async (req, res) => {
  try {

    const posts = await Post.find({ user: req.user._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* -----------------------------
   Delete Post
------------------------------*/
export const deletePost = async (req, res) => {
  try {

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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};