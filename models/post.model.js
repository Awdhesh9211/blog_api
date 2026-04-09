import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: [5, "Title must be at least 5 characters long"],
        max: [100, "Title must be less than 100 characters long"],
        trim: true
    },
    content:{
        type: String,
        required: true,
        min: [20, "Content must be at least 20 characters long"],
        trim: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
