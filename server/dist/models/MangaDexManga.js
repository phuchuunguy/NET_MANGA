"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MangaDexMangaSchema = new mongoose_1.default.Schema({
    mangaDexId: { type: String, required: true, unique: true, index: true },
    attributes: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    relationships: { type: mongoose_1.default.Schema.Types.Mixed, default: [] },
    syncedAt: { type: Date, required: true, default: Date.now },
}, { versionKey: false });
const MangaDexManga = mongoose_1.default.models.MangaDexManga ||
    mongoose_1.default.model("MangaDexManga", MangaDexMangaSchema);
exports.default = MangaDexManga;
