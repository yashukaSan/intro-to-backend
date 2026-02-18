import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique : true,
            lowercase: true,
            trim: true,
            minLength: 2,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 5,
             maxLength: 20
        },
        email: {
            type: String,
            required: true,
             unique: true,
             lowercase: true,
             trime: true
        }
    },
    {
        timestamp: true
    }
)

export const User = mongoose.model("User", userSchema);