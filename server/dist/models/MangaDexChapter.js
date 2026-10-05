"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MangaDexChapterSchema = new mongoose_1.default.Schema({
    chapterDexId: { type: String, required: true, unique: true, index: true },
    mangaDexId: { type: String, index: true },
    attributes: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    relationships: { type: mongoose_1.default.Schema.Types.Mixed, default: [] },
    pageManifest: { type: mongoose_1.default.Schema.Types.Mixed },
    syncedAt: { type: Date, required: true, default: Date.now },
}, { versionKey: false });
MangaDexChapterSchema.index({ mangaDexId: 1, syncedAt: -1 });
const MangaDexChapter = mongoose_1.default.models.MangaDexChapter ||
    mongoose_1.default.model("MangaDexChapter", MangaDexChapterSchema);
exports.default = MangaDexChapter;
