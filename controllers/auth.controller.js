import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/token.js";
import asyncHandler from "../util/asyncHandler.js";
import ApiError from "../util/ApiError.js";


export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) throw new ApiError(400, "User already exists");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // create cookie token
    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

});


/* -----------------------------
   Login User
------------------------------*/
export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new ApiError(401, "Invalid email or password"); 

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new ApiError(401, "Invalid email or password");

    // generate cookie token
    generateToken(res, user._id);

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  });


/* -----------------------------
   Logout User
------------------------------*/
export const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });
};


/* -----------------------------
   Get Current User
------------------------------*/
export const getMe = async (req, res) => {

  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user
  });
};