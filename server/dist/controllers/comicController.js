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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllComic = exports.getAllComic = exports.deleteComic = exports.saveComic = void 0;
const comicService_1 = require("../services/comicService");
const define_1 = require("../lib/define");
const getAllComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, page, type } = req.query;
        if (!userId || !page || !type) {
            return res.status(500).json({
                status: "error",
                message: "User ID, Page and Type are required!",
            });
        }
        const response = yield (0, comicService_1.handleGetAllComic)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllComic = getAllComic;
const saveComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dataComic, userId, username, avatar } = req.body;
        if (!dataComic || !userId || !username || !avatar) {
            return res.status(500).json({
                status: "error",
                message: "DataComic, User ID, Username and Avatar are required!",
            });
        }
        const response = yield (0, comicService_1.handleSaveComic)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.saveComic = saveComic;
const deleteComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicSlug, userId } = req.query;
        if (!comicSlug || !userId) {
            return res.status(500).json({
                status: "error",
                message: "ComicSlug and User ID are required!",
            });
        }
        const response = yield (0, comicService_1.handleDeleteComic)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.deleteComic = deleteComic;
const deleteAllComic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, type } = req.query;
        if (!userId || !type) {
            return res.status(500).json({
                status: "error",
                message: "User ID and type are required!",
            });
        }
        const response = yield (0, comicService_1.handleDeleteAllComic)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.deleteAllComic = deleteAllComic;
