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
exports.handleGetAllVipLevelForAdmin = exports.handleGetAllVipLevel = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const define_1 = require("../lib/define");
const getVipLevels = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (whereClause = "") {
    const sql_select = `
    Select * from vip_levels
    ${whereClause}
    order by level asc
  `;
    const [rows] = yield mysql_1.default.promise().query(sql_select);
    return {
        status: "success",
        message: "Get vip levels successfully!",
        data: {
            items: rows,
        },
    };
});
const handleGetAllVipLevel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield getVipLevels("where is_admin_only = 0");
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetAllVipLevel = handleGetAllVipLevel;
const handleGetAllVipLevelForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield getVipLevels();
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetAllVipLevelForAdmin = handleGetAllVipLevelForAdmin;
