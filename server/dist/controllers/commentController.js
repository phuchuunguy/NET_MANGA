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
exports.unlikeComment = exports.likeComment = exports.updateComment = exports.deleteComment = exports.createComment = exports.getComments = void 0;
const commentService_1 = require("../services/commentService");
const define_1 = require("../lib/define");
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comicSlug, limit, page, sort } = req.query;
        if (!comicSlug || !limit || !page || !sort) {
            return res.status(400).json({
                status: "error",
                message: "ComicSlug, Limit, Page and Sort are required!",
            });
        }
        const response = yield (0, commentService_1.handleGetComments)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getComments = getComments;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, content, comicSlug, comicName } = req.body;
        if (!userId || !content || !comicSlug || !comicName) {
            return res.status(400).json({
                status: "error",
                message: "User ID, Content, ComicSlug and ComicName are required!",
            });
        }
        const response = yield (0, commentService_1.handleCreateComment)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, userId } = req.query;
        if (!commentId || !userId) {
            return res.status(400).json({
                status: "error",
                message: "Comment ID và User ID are required!",
            });
        }
        const response = yield (0, commentService_1.handleDeleteComment)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.deleteComment = deleteComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content, userId } = req.body;
        if (!content || !id || !userId) {
            return res.status(400).json({
                status: "error",
                message: "Content, CommentID and User ID are required!",
            });
        }
        const data = { id, content, userId };
        const response = yield (0, commentService_1.handleUpdateComment)(data);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.updateComment = updateComment;
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, userId } = req.body;
        if (!commentId || !userId) {
            return res.status(400).json({
                status: "error",
                message: "Comment ID and User ID are required!",
            });
        }
        const response = yield (0, commentService_1.handleLikeComment)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.likeComment = likeComment;
const unlikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId, userId } = req.query;
        if (!commentId || !userId) {
            return res.status(400).json({
                status: "error",
                message: "Comment ID and User ID are required!",
            });
        }
        const response = yield (0, commentService_1.handleUnlikeComment)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.unlikeComment = unlikeComment;
