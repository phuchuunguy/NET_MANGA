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
exports.handleAddFeedback = exports.handleGetUserRankings = exports.handleFindUserByEmailAndTypeAccount = exports.handleGetUserStatistical = exports.handleGetUserInfo = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const define_1 = require("../lib/define");
const uuid_1 = require("uuid");
const SavedComic_1 = __importDefault(require("../models/SavedComic"));
const ViewedHistory_1 = __importDefault(require("../models/ViewedHistory"));
const handleGetUserInfo = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, typeAccount, userId } = rawData;
    try {
        const sql_select = `
      Select 
        users.id as user_id,
        users.name as username,
        users.email,
        users.avatar,
        users.created_at, 
        users.type_account,
        roles.name as role_name, 
        vip_levels.level as vip_level,
        vip_levels.nickname as nickname,
        vip_levels.max_stories as max_stories
      from users, roles, vip_levels 
      where ${userId ? `users.id = '${userId}'` : `users.email = '${email}'`}
      ${typeAccount ? `and users.type_account = '${typeAccount}'` : ""}
      and users.role_id = roles.id
      and users.vip_level_id = vip_levels.id
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select);
        if ((rows === null || rows === void 0 ? void 0 : rows.length) === 0) {
            return {
                status: "error",
                error_code: "user_not_found",
                message: "Không tìm thấy người dùng!",
            };
        }
        return {
            status: "success",
            message: "Lấy thông tin người dùng thành công!",
            user: rows === null || rows === void 0 ? void 0 : rows[0],
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetUserInfo = handleGetUserInfo;
const handleGetUserStatistical = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        const sql_select = `
        Select count(*) as total_comments from comments where user_id = '${userId}' 
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select);
        const savedComic = yield SavedComic_1.default.find({ userId });
        const viewdComic = yield ViewedHistory_1.default.find({ userId });
        return {
            status: "success",
            message: "Lấy thông tin thống kê người dùng thành công!",
            statistical: {
                total_comments: (_b = (_a = rows === null || rows === void 0 ? void 0 : rows[0]) === null || _a === void 0 ? void 0 : _a.total_comments) !== null && _b !== void 0 ? _b : 0,
                total_saved_comic: (_e = (_d = (_c = savedComic === null || savedComic === void 0 ? void 0 : savedComic[0]) === null || _c === void 0 ? void 0 : _c.comics) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0,
                total_viewed_comic: (_h = (_g = (_f = viewdComic === null || viewdComic === void 0 ? void 0 : viewdComic[0]) === null || _f === void 0 ? void 0 : _f.comics) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetUserStatistical = handleGetUserStatistical;
const handleFindUserByEmailAndTypeAccount = (email, typeAccount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql_select = `
      Select id from users where email = '${email}' and type_account = '${typeAccount}'
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select);
        return {
            status: "success",
            message: (rows === null || rows === void 0 ? void 0 : rows.length) > 0
                ? "Tìm thấy người dùng!"
                : "Không tìm thấy người dùng!",
            user: rows === null || rows === void 0 ? void 0 : rows[0],
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleFindUserByEmailAndTypeAccount = handleFindUserByEmailAndTypeAccount;
const handleGetUserRankings = (criterion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sql_select = "";
        let rows = [];
        const quantity = 10;
        switch (criterion) {
            case "vip_level":
                sql_select = `
          Select
            users.id as user_id,
            users.name as username,
            users.avatar,
            vip_levels.nickname as nickname,
            vip_levels.level as vip_level
          from users, vip_levels
          where users.vip_level_id = vip_levels.id
          order by vip_levels.level desc
          limit ${quantity}
        `;
                [rows] = yield mysql_1.default.promise().query(sql_select);
                break;
            case "comment_wrote":
                sql_select = `
          Select
            users.id as user_id,
            users.name as username,
            users.avatar,
            count(comments.id) as quantity
          from users, comments
          where users.id = comments.user_id and comments.is_spam = 0
          group by users.id, users.name, users.avatar
          order by quantity desc
          limit ${quantity}
        `;
                [rows] = yield mysql_1.default.promise().query(sql_select);
                break;
            case "saved_comic":
            case "number_of_stories_read":
                if (criterion === "saved_comic") {
                    rows = yield SavedComic_1.default.find();
                }
                else if (criterion === "number_of_stories_read") {
                    rows = yield ViewedHistory_1.default.find();
                }
                rows = rows
                    .sort((a, b) => b.comics.length - a.comics.length)
                    .slice(0, quantity)
                    .map((item) => {
                    var _a;
                    return {
                        user_id: item.userId,
                        username: item.username,
                        avatar: item.avatar,
                        quantity: (_a = item.comics) === null || _a === void 0 ? void 0 : _a.length,
                    };
                });
                break;
            default:
                return {
                    status: "error",
                    message: "Tiêu chí không hợp lệ!",
                };
        }
        return {
            status: "success",
            message: "Lấy bảng xếp hạng người dùng thành công!",
            data: {
                criterion,
                users: rows,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetUserRankings = handleGetUserRankings;
const handleAddFeedback = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId, title, description } = rawData;
    try {
        const sql_insert = `
      Insert into user_feedback (id, user_id, title, description)
      values ('${(0, uuid_1.v4)()}', '${userId}', '${title}', '${description}')
    `;
        const response = yield mysql_1.default.promise().query(sql_insert);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "Gửi phản hồi thất bại!",
            };
        }
        return {
            status: "success",
            message: "Gửi phản hồi thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleAddFeedback = handleAddFeedback;
