// create a schema for the bookmark model with description and image fields category
// Path: models/bookmark-model.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);