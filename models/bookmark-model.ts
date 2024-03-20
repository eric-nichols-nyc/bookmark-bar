// create a schema for the bookmark model with description and image fields category
// Path: models/bookmark-model.ts
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    tags: [String],
    category: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Bookmark = mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);