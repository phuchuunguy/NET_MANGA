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
exports.markUserCommentAsSpam = exports.updateVipLevels = exports.updateUserRole = exports.getAllFeedbacks = exports.getAllVipLevels = exports.getAllNotifications = exports.getAllComments = exports.getAllUsers = void 0;
const adminService_1 = require("../services/adminService");
const vipLevelService_1 = require("../services/vipLevelService");
const define_1 = require("../lib/define");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, adminService_1.handleGetAllUsers)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllUsers = getAllUsers;
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, adminService_1.handleGetAllComments)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllComments = getAllComments;
const getAllNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, adminService_1.handleGetAllNotifications)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllNotifications = getAllNotifications;
const getAllVipLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, vipLevelService_1.handleGetAllVipLevelForAdmin)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllVipLevels = getAllVipLevels;
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, adminService_1.handleGetAllFeedbacks)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!id || !role) {
            return res.status(400).json({
                status: "error",
                message: "User ID and Role are required!",
            });
        }
        const response = yield (0, adminService_1.handleUpdateUserRole)(id, role);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.updateUserRole = updateUserRole;
const updateVipLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idVipLevel } = req.body;
        if (!id || !idVipLevel) {
            return res.status(400).json({
                status: "error",
                message: "User ID and Vip Level ID are required!",
            });
        }
        const response = yield (0, adminService_1.handleUpdateVipLevels)(id, idVipLevel);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.updateVipLevels = updateVipLevels;
const markUserCommentAsSpam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "Comment ID is required!",
            });
        }
        const response = yield (0, adminService_1.handleMarkUserCommentAsSpam)(id);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.markUserCommentAsSpam = markUserCommentAsSpam;
