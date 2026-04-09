import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        min: [3, "Name must be at least 3 characters long"],
        max: [50, "Name must be less than 50 characters long"],
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password:{
        type: String,
        required: true,
        min: [6, "Password must be at least 6 characters long"],
        select: false // Do not return password by default
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
