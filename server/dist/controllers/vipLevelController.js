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
exports.getAllVipLevelForAdmin = exports.getAllVipLevel = void 0;
const define_1 = require("../lib/define");
const vipLevelService_1 = require("../services/vipLevelService");
const getAllVipLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, vipLevelService_1.handleGetAllVipLevel)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllVipLevel = getAllVipLevel;
const getAllVipLevelForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, vipLevelService_1.handleGetAllVipLevelForAdmin)();
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.getAllVipLevelForAdmin = getAllVipLevelForAdmin;
