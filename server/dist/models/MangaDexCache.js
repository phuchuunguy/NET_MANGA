"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MangaDexCacheSchema = new mongoose_1.default.Schema({
    cacheKey: { type: String, required: true, unique: true, index: true },
    endpoint: { type: String, required: true },
    payload: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    cachedAt: { type: Date, required: true, default: Date.now },
}, { versionKey: false });
MangaDexCacheSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });
const MangaDexCache = mongoose_1.default.models.MangaDexCache ||
    mongoose_1.default.model("MangaDexCache", MangaDexCacheSchema);
exports.default = MangaDexCache;
