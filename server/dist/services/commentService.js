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
exports.handleUnlikeComment = exports.handleLikeComment = exports.handleUpdateComment = exports.handleDeleteComment = exports.handleCreateComment = exports.handleGetComments = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const define_1 = require("../lib/define");
const uuid_1 = require("uuid");
const handleGetComments = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { comicSlug, limit, page, sort } = rawData;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    try {
        const sql_select_by_page = `
      SELECT 
          c.id AS comment_id,
          c.content,
          c.user_id,
          c.chapter,
          c.is_spam,
          c.created_at,
          r.name AS role_name,
          u.avatar AS user_avatar,
          u.name AS user_name,
          v.nickname AS nickname,
          v.level as vip_level,
          COUNT(l.id) AS like_count,
          GROUP_CONCAT(DISTINCT CONCAT(l.user_id, ';', u_liker.name, ';', u.avatar)) AS liked_by_users
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN roles r ON u.role_id = r.id
      JOIN vip_levels v ON u.vip_level_id = v.id
      LEFT JOIN likes l ON c.id = l.comment_id
      LEFT JOIN users u_liker ON l.user_id = u_liker.id
      WHERE c.comic_slug = '${comicSlug}' and c.is_deleted = 0
      GROUP BY c.id, c.content, c.created_at, u.name, c.user_id
      ORDER BY c.created_at ${sort}
      LIMIT ${limit} OFFSET ${offset};
    `;
        const sql_select_total = `
      Select count(*) as total from comments
      where comic_slug = '${comicSlug}' and is_deleted = 0
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select_by_page);
        const [rows_total] = yield mysql_1.default
            .promise()
            .query(sql_select_total);
        const likedByUsers = rows.map((row) => {
            var _a, _b;
            if (!row.liked_by_users)
                return [];
            const likedByUsers = (_b = (_a = row.liked_by_users) === null || _a === void 0 ? void 0 : _a.split(",")) === null || _b === void 0 ? void 0 : _b.map((item) => {
                const [userId, userName, avatar] = item.split(";");
                return { userId, userName, avatar };
            });
            return likedByUsers;
        });
        const finalData = rows.map((row, index) => {
            return Object.assign(Object.assign({}, row), { liked_by_users: likedByUsers[index] });
        });
        return {
            status: "success",
            message: "Lấy thông tin bình luận thành công!",
            data: {
                items: finalData,
                totalItems: rows_total[0].total,
            },
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleGetComments = handleGetComments;
const handleCreateComment = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId, content, comicSlug, chapter, comicName } = rawData;
        const id = (0, uuid_1.v4)();
        const sql_insert = `
      Insert into comments (id, user_id, content, comic_slug, chapter, comic_name)
      values (
        '${id}', '${userId}', '${content}',
        '${comicSlug}', '${chapter !== null && chapter !== void 0 ? chapter : ""}', '${comicName}'
      )
    `;
        const response = yield mysql_1.default.promise().query(sql_insert);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "Tạo bình luận thất bại!",
            };
        }
        return {
            status: "success",
            message: "Tạo bình luận thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleCreateComment = handleCreateComment;
const handleDeleteComment = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { commentId, userId } = rawData;
    try {
        const sql_delete = `
      UPDATE comments set is_deleted = 1
      where id = '${commentId}' and user_id = '${userId}'
    `;
        const response = yield mysql_1.default.promise().query(sql_delete);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "Xóa bình luận thất bại!",
            };
        }
        return {
            status: "success",
            message: "Xóa bình luận thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleDeleteComment = handleDeleteComment;
const handleUpdateComment = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id, userId, content } = rawData;
    try {
        const sql_update = `
      Update comments 
      set content = '${content}'
      where id = '${id}' and user_id = '${userId}'
    `;
        const response = yield mysql_1.default.promise().query(sql_update);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "Cập nhật bình luận thất bại!",
            };
        }
        return {
            status: "success",
            message: "Cập nhật bình luận thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleUpdateComment = handleUpdateComment;
const handleLikeComment = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { commentId, userId } = rawData;
        const id = (0, uuid_1.v4)();
        const sql_like_comment = `
      Insert into likes (id, comment_id, user_id)
      values ('${id}', '${commentId}', '${userId}')
    `;
        const response = yield mysql_1.default.promise().query(sql_like_comment);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "like comment failed",
            };
        }
        return {
            status: "success",
            message: "like comment",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleLikeComment = handleLikeComment;
const handleUnlikeComment = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { commentId, userId } = rawData;
        const sql_dislike_comment = `
      Delete from likes
      where comment_id = '${commentId}' and user_id = '${userId}'
    `;
        const response = yield mysql_1.default.promise().query(sql_dislike_comment);
        if (((_a = response === null || response === void 0 ? void 0 : response[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
            return {
                status: "error",
                message: "dislike comment failed",
            };
        }
        return {
            status: "success",
            message: "dislike comment",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleUnlikeComment = handleUnlikeComment;
