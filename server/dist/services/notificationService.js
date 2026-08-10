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
exports.handleUpdateNotification = exports.handleDeleteNotification = exports.handleCreateNotification = exports.handleGetAllNotifications = void 0;
const define_1 = require("../lib/define");
const mysql_1 = __importDefault(require("../database/mysql"));
const uuid_1 = require("uuid");
const handleGetAllNotifications = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, userId, limit, page } = rawData;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
        const sql_select = type === "system"
            ? `
          SELECT * FROM notification
          WHERE type = '${type}' and is_deleted = 0
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset};
        `
            : `
          SELECT * FROM notification
          WHERE type = '${type}'
          AND user_id = '${userId}' and is_deleted = 0
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset};
       `;
        const sql_select_total = type === "system"
            ? `
      SELECT count(*) as total from notification
      WHERE type = '${type}' and is_deleted = 0
    `
            : `
      SELECT count(*) as total from notification
      WHERE type = '${type}'
      AND user_id = '${userId}' and is_deleted = 0
    `;
        const [rows] = yield mysql_1.default.promise().execute(sql_select);
        const [rows_total] = yield mysql_1.default
            .promise()
            .execute(sql_select_total);
        return {
            status: "success",
            data: {
                items: rows,
                totalItem: rows_total[0].total,
                type,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetAllNotifications = handleGetAllNotifications;
const handleCreateNotification = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, userId, type } = rawData;
    try {
        const id = (0, uuid_1.v4)();
        const sql_insert = `
      INSERT INTO notification (id, title, content, type, user_id)
      VALUES ('${id}', '${title}', '${content}', '${type}', '${userId}')
    `;
        const [rows] = yield mysql_1.default.promise().execute(sql_insert);
        console.log(rows);
        if (rows.affectedRows === 0) {
            return {
                status: "error",
                message: "Tạo thông báo thất bại!",
            };
        }
        return {
            status: "success",
            message: "Tạo thông báo thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleCreateNotification = handleCreateNotification;
const handleDeleteNotification = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId, userId, role } = rawData;
    try {
        let sql_delete = "";
        if (role === "admin") {
            sql_delete = `
        UPDATE notification set is_deleted = 1
        WHERE id = '${notificationId}' 
      `;
        }
        else if (role === "user") {
            sql_delete = `
        UPDATE notification set is_deleted = 1
        WHERE id = '${notificationId}' and user_id = '${userId}'
      `;
        }
        const [rows] = yield mysql_1.default.promise().execute(sql_delete);
        if (rows.affectedRows === 0) {
            return {
                status: "error",
                message: "Xóa thông báo thất bại!",
            };
        }
        return {
            status: "success",
            message: "Xóa thông báo thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleDeleteNotification = handleDeleteNotification;
const handleUpdateNotification = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, content } = rawData;
    try {
        const sql_update = `
      UPDATE notification
      SET title = '${title}', content = '${content}'
      WHERE id = '${id}' 
    `;
        const [rows] = yield mysql_1.default.promise().execute(sql_update);
        if (rows.affectedRows === 0) {
            return {
                status: "error",
                message: "Cập nhật thông báo thất bại!",
            };
        }
        return {
            status: "success",
            message: "Cập nhật thông báo thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleUpdateNotification = handleUpdateNotification;
