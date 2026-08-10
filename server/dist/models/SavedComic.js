"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SavedComicSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    comics: [
        {
            type: mongoose_1.default.Schema.Types.Mixed,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const SavedComic = mongoose_1.default.model("SavedComic", SavedComicSchema);
exports.default = SavedComic;
