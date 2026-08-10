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
exports.updateNotification = exports.deleteNotification = exports.createNotification = exports.getAllNotifications = void 0;
const notificationService_1 = require("../services/notificationService");
const define_1 = require("../lib/define");
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, limit, page, userId } = req.query;
        if (!type || !limit || !page || !userId) {
            return res.status(400).json({
                status: "error",
                message: "Type, Limit, Page and UserId are required!",
            });
        }
        const response = yield (0, notificationService_1.handleGetAllNotifications)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllNotifications = getAllNotifications;
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId, type } = req.body;
        if (!title || !content || !userId || !type) {
            return res.status(400).json({
                status: "error",
                message: "Title, Content, UserId and Type are required!",
            });
        }
        const response = yield (0, notificationService_1.handleCreateNotification)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.createNotification = createNotification;
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId, userId, role } = req.query;
        if (!notificationId || !userId || !role) {
            return res.status(400).json({
                status: "error",
                message: "NotificationId, UserId and Role are required!",
            });
        }
        const response = yield (0, notificationService_1.handleDeleteNotification)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.deleteNotification = deleteNotification;
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        if (!id || !title || !content) {
            return res.status(400).json({
                status: "error",
                message: "Comment ID, Title and Content are required!",
            });
        }
        const data = {
            id,
            title,
            content,
        };
        const response = yield (0, notificationService_1.handleUpdateNotification)(data);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.updateNotification = updateNotification;
