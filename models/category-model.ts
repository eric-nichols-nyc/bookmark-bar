// create a schema for the bookmark model with description and image fields category
// Path: models/bookmark-model.ts
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);