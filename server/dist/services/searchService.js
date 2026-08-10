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
exports.handleDeleteSearchHistory = exports.handleAddSearchHistory = exports.handleGetSearchHistory = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const define_1 = require("../lib/define");
const uuid_1 = require("uuid");
const handleGetSearchHistory = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, limit, page } = rawData;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
        const sql_select = `
      Select * from search_history 
      where user_id = '${userId}' and is_deleted = 0
      order by created_at desc
      limit ${limit} offset ${offset}
    `;
        const sql_select_total = `
      Select count(*) as total from search_history
      where user_id = '${userId}' and is_deleted = 0
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select);
        const [rows_total] = yield mysql_1.default
            .promise()
            .query(sql_select_total);
        return {
            status: "success",
            message: "Lấy thông tin tìm kiếm thành công!",
            data: {
                items: rows,
                totalItems: rows_total[0].total,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetSearchHistory = handleGetSearchHistory;
const handleAddSearchHistory = (userId, keyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const sql_insert = `
      Insert into search_history (id, user_id, keyword)
      values ('${id}', '${userId}', '${keyword}')
    `;
        yield mysql_1.default.promise().query(sql_insert);
        return {
            status: "success",
            message: "Thêm lịch sử tìm kiếm thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleAddSearchHistory = handleAddSearchHistory;
const handleDeleteSearchHistory = (userId, searchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql_delete = `
      Update search_history set is_deleted = 1
      where user_id = '${userId}' and id = '${searchId}'
    `;
        yield mysql_1.default.promise().query(sql_delete);
        return {
            status: "success",
            message: "Xóa lịch sử tìm kiếm thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleDeleteSearchHistory = handleDeleteSearchHistory;
