"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMangaDexData = getMangaDexData;
const crypto_1 = require("crypto");
const MangaDexCache_1 = __importDefault(require("../models/MangaDexCache"));
const MangaDexChapter_1 = __importDefault(require("../models/MangaDexChapter"));
const MangaDexManga_1 = __importDefault(require("../models/MangaDexManga"));
const API_BASE = "https://api.mangadex.org";
const CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;
const ALLOWED_ENDPOINT = /^(manga(?:\/[0-9a-f-]{36}(?:\/feed)?)?|manga\/tag|chapter\/[0-9a-f-]{36}|at-home\/server\/[0-9a-f-]{36})$/i;
function getEntities(payload) {
    if (typeof payload !== "object" || payload === null)
        return [];
    const data = payload.data;
    if (Array.isArray(data))
        return data;
    if (typeof data === "object" && data !== null)
        return [data];
    return [];
}
function persistCatalog(endpoint, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const syncedAt = new Date();
        if (endpoint === "manga" || /^manga\/[0-9a-f-]{36}$/i.test(endpoint)) {
            const entities = getEntities(payload);
            yield Promise.all(entities.map((entity) => {
                var _a;
                return MangaDexManga_1.default.updateOne({ mangaDexId: entity.id }, {
                    $set: {
                        attributes: entity.attributes,
                        relationships: (_a = entity.relationships) !== null && _a !== void 0 ? _a : [],
                        syncedAt,
                    },
                }, { upsert: true });
            }));
            return;
        }
        const mangaFeedMatch = endpoint.match(/^manga\/([0-9a-f-]{36})\/feed$/i);
        if (mangaFeedMatch) {
            const mangaDexId = mangaFeedMatch[1];
            yield Promise.all(getEntities(payload).map((entity) => {
                var _a;
                return MangaDexChapter_1.default.updateOne({ chapterDexId: entity.id }, {
                    $set: {
                        mangaDexId,
                        attributes: entity.attributes,
                        relationships: (_a = entity.relationships) !== null && _a !== void 0 ? _a : [],
                        syncedAt,
                    },
                }, { upsert: true });
            }));
            return;
        }
        if (/^chapter\/[0-9a-f-]{36}$/i.test(endpoint)) {
            const chapter = getEntities(payload)[0];
            if (!chapter)
                return;
            const mangaDexId = (_b = (_a = chapter.relationships) === null || _a === void 0 ? void 0 : _a.find((relationship) => relationship.type === "manga")) === null || _b === void 0 ? void 0 : _b.id;
            yield MangaDexChapter_1.default.updateOne({ chapterDexId: chapter.id }, {
                $set: {
                    mangaDexId,
                    attributes: chapter.attributes,
                    relationships: (_c = chapter.relationships) !== null && _c !== void 0 ? _c : [],
                    syncedAt,
                },
            }, { upsert: true });
            return;
        }
        const atHomeMatch = endpoint.match(/^at-home\/server\/([0-9a-f-]{36})$/i);
        if (atHomeMatch) {
            yield MangaDexChapter_1.default.updateOne({ chapterDexId: atHomeMatch[1] }, { $set: { pageManifest: payload, syncedAt } });
        }
    });
}
function getRequestData(req) {
    var _a;
    const requestUrl = new URL(req.originalUrl, "http://localhost");
    const endpoint = (_a = requestUrl.searchParams.get("endpoint")) !== null && _a !== void 0 ? _a : "";
    if (!ALLOWED_ENDPOINT.test(endpoint)) {
        return null;
    }
    const params = [...requestUrl.searchParams.entries()]
        .filter(([key]) => key !== "endpoint")
        .sort(([leftKey, leftValue], [rightKey, rightValue]) => leftKey === rightKey
        ? leftValue.localeCompare(rightValue)
        : leftKey.localeCompare(rightKey));
    const query = new URLSearchParams(params).toString();
    const cacheKey = (0, crypto_1.createHash)("sha256")
        .update(`${endpoint}?${query}`)
        .digest("hex");
    return { endpoint, query, cacheKey };
}
function getMangaDexData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestData = getRequestData(req);
        if (!requestData) {
            res.status(400).json({ error: "Invalid MangaDex endpoint" });
            return;
        }
        const { endpoint, query, cacheKey } = requestData;
        const limit = Number(new URL(req.originalUrl, "http://localhost").searchParams.get("limit"));
        if (Number.isFinite(limit) && limit > 500) {
            res.status(400).json({ error: "MangaDex limit cannot exceed 500" });
            return;
        }
        let cached = null;
        try {
            cached = yield MangaDexCache_1.default.findOne({ cacheKey })
                .select("payload cachedAt")
                .lean();
        }
        catch (error) {
            console.error("Unable to read MangaDex cache:", error);
        }
        if (cached && Date.now() - new Date(cached.cachedAt).getTime() < CACHE_TTL_MS) {
            res.setHeader("X-MangaDex-Cache", "HIT");
            res.status(200).json(cached.payload);
            return;
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
        try {
            const upstreamUrl = `${API_BASE}/${endpoint}${query ? `?${query}` : ""}`;
            const upstream = yield fetch(upstreamUrl, {
                headers: {
                    Accept: "application/json",
                    "User-Agent": "NetManga/1.0",
                },
                signal: controller.signal,
            });
            const body = yield upstream.text();
            if (!upstream.ok) {
                if (cached) {
                    res.setHeader("X-MangaDex-Cache", "STALE");
                    res.status(200).json(cached.payload);
                    return;
                }
                res.status(upstream.status).type("application/json").send(body);
                return;
            }
            let payload;
            try {
                payload = JSON.parse(body);
            }
            catch (_a) {
                res.status(502).json({ error: "MangaDex returned invalid JSON" });
                return;
            }
            try {
                yield MangaDexCache_1.default.updateOne({ cacheKey }, {
                    $set: { endpoint, payload, cachedAt: new Date() },
                }, { upsert: true });
            }
            catch (error) {
                console.error("Unable to save MangaDex response:", error);
            }
            try {
                yield persistCatalog(endpoint, payload);
            }
            catch (error) {
                console.error("Unable to sync MangaDex catalog:", error);
            }
            res.setHeader("X-MangaDex-Cache", "MISS");
            res.status(200).json(payload);
        }
        catch (error) {
            if (cached) {
                res.setHeader("X-MangaDex-Cache", "STALE");
                res.status(200).json(cached.payload);
                return;
            }
            console.error("MangaDex request failed:", error);
            res.status(502).json({
                error: "MangaDex is temporarily unavailable",
                details: error instanceof Error ? error.message : "Unknown error",
            });
        }
        finally {
            clearTimeout(timeout);
        }
    });
}
