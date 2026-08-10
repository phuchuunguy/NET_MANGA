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
exports.handleDeleteAllComic = exports.handleGetAllComic = exports.handleDeleteComic = exports.handleSaveComic = void 0;
const define_1 = require("../lib/define");
const SavedComic_1 = __importDefault(require("../models/SavedComic"));
const ViewedHistory_1 = __importDefault(require("../models/ViewedHistory"));
const handleGetAllComic = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { page, userId, type } = rawData;
        const itemsPerPage = 24;
        const skip = ((isNaN(Number(page)) ? 1 : Number(page)) - 1) * itemsPerPage;
        let data = type === "GET_ALL_SAVED_COMIC"
            ? yield SavedComic_1.default.find({ userId })
            : yield ViewedHistory_1.default.find({ userId });
        (_b = (_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.comics) === null || _b === void 0 ? void 0 : _b.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const finalData = (_d = (_c = data === null || data === void 0 ? void 0 : data[0]) === null || _c === void 0 ? void 0 : _c.comics) === null || _d === void 0 ? void 0 : _d.filter((item) => item.is_deleted === false);
        const items = Number(page) === 0 || Number(page) === -1
            ? finalData
            : finalData === null || finalData === void 0 ? void 0 : finalData.slice(skip, skip + itemsPerPage);
        const totalItems = finalData === null || finalData === void 0 ? void 0 : finalData.length;
        return {
            status: "success",
            message: "Lấy danh sách truyện thành công",
            data: {
                items,
                totalItems,
                type,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetAllComic = handleGetAllComic;
const handleSaveComic = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { dataComic, userId, type, username, avatar } = rawData;
        let res = type === "SAVED_COMIC"
            ? yield SavedComic_1.default.findOne({ userId })
            : yield ViewedHistory_1.default.findOne({ userId });
        if (!res) {
            res =
                type === "SAVED_COMIC"
                    ? new SavedComic_1.default({ userId, username, avatar, comics: [] })
                    : new ViewedHistory_1.default({ userId, username, avatar, comics: [] });
        }
        const indexComicExist = (_a = res === null || res === void 0 ? void 0 : res.comics) === null || _a === void 0 ? void 0 : _a.findIndex((comic) => {
            if (type === "SAVED_COMIC") {
                return comic.slug === (dataComic === null || dataComic === void 0 ? void 0 : dataComic.slug);
            }
            else if (type === "VIEWED_COMIC") {
                return comic.id === (dataComic === null || dataComic === void 0 ? void 0 : dataComic.id);
            }
        });
        if (indexComicExist !== -1) {
            res.comics[indexComicExist].is_deleted = false;
        }
        else {
            res.comics.push(dataComic);
        }
        res.markModified("comics");
        yield res.save();
        return {
            status: "success",
            message: "Lưu truyện thành công",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleSaveComic = handleSaveComic;
const handleDeleteComic = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { comicSlug, comicId, userId, type } = rawData;
        let data = type === "SAVED_COMIC"
            ? yield SavedComic_1.default.findOne({ userId })
            : yield ViewedHistory_1.default.findOne({ userId });
        const indexComicDelete = (_a = data === null || data === void 0 ? void 0 : data.comics) === null || _a === void 0 ? void 0 : _a.findIndex((comic) => {
            if (type === "SAVED_COMIC") {
                return comic.slug === comicSlug;
            }
            else if (type === "VIEWED_COMIC") {
                return comic.id === comicId;
            }
        });
        data.comics[indexComicDelete].is_deleted = true;
        data.markModified("comics");
        yield data.save();
        if (!data) {
            return {
                status: "error",
                error_code: "error-delete-comic",
                message: "Xóa truyện thất bại",
            };
        }
        return {
            status: "success",
            message: "Xóa truyện thành công",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleDeleteComic = handleDeleteComic;
const handleDeleteAllComic = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId, type } = rawData;
        let data = null;
        type === "SAVED_COMIC"
            ? (data = yield SavedComic_1.default.findOne({ userId }))
            : (data = yield ViewedHistory_1.default.findOne({ userId }));
        (_a = data.comics) === null || _a === void 0 ? void 0 : _a.forEach((comic) => {
            comic.is_deleted = true;
        });
        data.markModified("comics");
        yield data.save();
        return {
            status: "success",
            message: type === "SAVED_COMIC"
                ? "Đã xóa tất cả truyện lưu"
                : "Đã xoá lịch sử đã xem",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleDeleteAllComic = handleDeleteAllComic;
