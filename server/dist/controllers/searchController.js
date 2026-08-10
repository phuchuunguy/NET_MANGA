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
exports.deleteSearchHistory = exports.addSearchHistory = exports.getSearchHistory = void 0;
const searchService_1 = require("../services/searchService");
const define_1 = require("../lib/define");
const getSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, limit, page } = req.query;
        if (!userId || !limit || !page) {
            return res.status(400).json({
                status: "error",
                message: "User ID is required!",
            });
        }
        const response = yield (0, searchService_1.handleGetSearchHistory)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getSearchHistory = getSearchHistory;
const addSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, keyword } = req.body;
        if (!userId || !keyword) {
            return res.status(400).json({
                status: "error",
                message: "User ID and Keyword are required!",
            });
        }
        const response = yield (0, searchService_1.handleAddSearchHistory)(userId, keyword);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.addSearchHistory = addSearchHistory;
const deleteSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, searchId } = req.query;
        if (!userId || !searchId) {
            return res.status(400).json({
                status: "error",
                message: "User ID and Search ID are required!",
            });
        }
        const response = yield (0, searchService_1.handleDeleteSearchHistory)(userId, searchId);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.deleteSearchHistory = deleteSearchHistory;
