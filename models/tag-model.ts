// create a schema for the bookmark model with description and image fields category
// Path: models/bookmark-model.ts
import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);