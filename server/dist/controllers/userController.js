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
exports.addFeedback = exports.findUserByEmailAndTypeAccount = exports.getUserRankings = exports.getUserStatistical = exports.getUserInfo = void 0;
const userService_1 = require("../services/userService");
const define_1 = require("../lib/define");
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, userService_1.handleGetUserInfo)(req.query);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getUserInfo = getUserInfo;
const getUserStatistical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(500).json({
                status: "error",
                message: "User ID is required!",
            });
        }
        const response = yield (0, userService_1.handleGetUserStatistical)(userId);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getUserStatistical = getUserStatistical;
const getUserRankings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { criterion } = req.query;
        if (!criterion) {
            return res.status(500).json({
                status: "error",
                message: "Criterion is required!",
            });
        }
        const response = yield (0, userService_1.handleGetUserRankings)(criterion);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getUserRankings = getUserRankings;
const findUserByEmailAndTypeAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, typeAccount } = req.query;
        if (!email || !typeAccount) {
            return res.status(500).json({
                status: "error",
                message: "Email and Type Account are required!",
            });
        }
        const response = yield (0, userService_1.handleFindUserByEmailAndTypeAccount)(email, typeAccount);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.findUserByEmailAndTypeAccount = findUserByEmailAndTypeAccount;
const addFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, title, description } = req.body;
        if (!userId || !title || !description) {
            return res.status(500).json({
                message: "User ID, Title and Description are required!",
            });
        }
        const response = yield (0, userService_1.handleAddFeedback)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.addFeedback = addFeedback;
