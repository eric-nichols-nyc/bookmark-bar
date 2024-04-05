// create a schema for the bookmark model with description and image fields category
// Path: models/bookmark-model.ts
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);