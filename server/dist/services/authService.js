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
exports.handleSendOTP = exports.handleResetPassword = exports.handleRegister = exports.handleLogin = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
const validator_1 = __importDefault(require("validator"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../lib/utils");
const define_1 = require("../lib/define");
const salt = bcrypt_1.default.genSaltSync(10);
const handleLogin = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { email, password, typeAccount } = rawData;
    try {
        const sql_select = `
      Select * from users 
      where email = '${email}' and type_account = '${typeAccount}'
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_select);
        const isCorrectPassword = (0, utils_1.checkPassword)(password, (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.password) !== null && _b !== void 0 ? _b : "");
        if ((rows === null || rows === void 0 ? void 0 : rows.length) === 0 || !isCorrectPassword) {
            return {
                status: "error",
                error_code: "invalid_credentials",
                message: "Thông tin đăng nhập không chính xác!",
            };
        }
        return {
            id: (_c = rows[0]) === null || _c === void 0 ? void 0 : _c.id,
            name: (_d = rows[0]) === null || _d === void 0 ? void 0 : _d.name,
            email: (_e = rows[0]) === null || _e === void 0 ? void 0 : _e.email,
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleLogin = handleLogin;
const handleRegister = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, otp, typeAccount, password, name, avatar } = rawData;
    try {
        if (typeAccount === "credentials") {
            if (!validator_1.default.isEmail(email)) {
                return {
                    status: "error",
                    error_code: "invalid_email",
                    message: "Email không hợp lệ!",
                };
            }
            if (!validator_1.default.isStrongPassword(password)) {
                return {
                    status: "error",
                    error_code: "weak_password",
                    message: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
                };
            }
        }
        const sql_check_email_exists = `
      Select * from users 
      where email = '${email}' and type_account = '${typeAccount}'
    `;
        const [rows] = yield mysql_1.default
            .promise()
            .query(sql_check_email_exists);
        if (rows.length > 0) {
            return {
                status: "error",
                error_code: "email_exist",
                message: "Email đã tồn tại trong hệ thống!",
            };
        }
        if (typeAccount === "credentials") {
            const sql_check_otp = `
      Select * from otp_codes
      where email = '${email}' 
      and otp = '${otp}' 
      and type = 'register_account'
    `;
            const [rows_otp] = yield mysql_1.default.promise().query(sql_check_otp);
            if (rows_otp.length === 0) {
                return {
                    status: "error",
                    error_code: "invalid_otp",
                    message: "Mã xác thực không chính xác!",
                };
            }
        }
        const user_id = (0, uuid_1.v4)();
        const passwordHash = typeAccount === "credentials"
            ? (0, utils_1.hashUserPassword)(password, salt)
            : `${user_id}-nuyhuphc`;
        const [rows_vip_levels] = yield mysql_1.default
            .promise()
            .query(`Select id from vip_levels where level = 1`);
        const sql_register_account = `
      Insert into users (id, name, email, password, role_id, account_status, type_account, avatar, vip_level_id)
      values ('${user_id}', '${name}', '${email}','${passwordHash}',
         '1', 'active', '${typeAccount}', '${avatar}', '${(_a = rows_vip_levels[0]) === null || _a === void 0 ? void 0 : _a.id}')
    `;
        const [rows_users] = yield mysql_1.default
            .promise()
            .query(sql_register_account);
        if (rows_users.length === 0) {
            return {
                status: "error",
                error_code: "error_register",
                message: "Lỗi khi đăng ký tài khoản!",
            };
        }
        return {
            status: "success",
            message: "Đăng ký tài khoản thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleRegister = handleRegister;
const handleResetPassword = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, password } = rawData;
    try {
        if (!validator_1.default.isEmail(email)) {
            return {
                status: "error",
                error_code: "invalid_email",
                message: "Email không hợp lệ!",
            };
        }
        if (!validator_1.default.isStrongPassword(password)) {
            return {
                status: "error",
                error_code: "weak_password",
                message: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
            };
        }
        const sql_check_email_exists = `
      Select * from users 
      where email = '${email}'
    `;
        const [rows] = yield mysql_1.default
            .promise()
            .query(sql_check_email_exists);
        if (rows.length === 0) {
            return {
                status: "error",
                error_code: "email_not_exist",
                message: "Email không tồn tại trong hệ thống!",
            };
        }
        const sql_check_otp = `
      Select * from otp_codes
      where email = '${email}' 
      and otp = '${otp}' 
      and type = 'forgot_password'
    `;
        const [rows_otp] = yield mysql_1.default.promise().query(sql_check_otp);
        if (rows_otp.length === 0) {
            return {
                status: "error",
                error_code: "invalid_otp",
                message: "Mã xác thực không chính xác!",
            };
        }
        const passwordHash = (0, utils_1.hashUserPassword)(rawData === null || rawData === void 0 ? void 0 : rawData.password, salt);
        const sql_update_password = `
      Update users
      set password = '${passwordHash}'
      where email = '${email}'
    `;
        const [rows_update] = yield mysql_1.default
            .promise()
            .query(sql_update_password);
        if (rows_update.length === 0) {
            return {
                status: "error",
                error_code: "error_reset_password",
                message: "Lỗi khi đặt lại mật khẩu!",
            };
        }
        return {
            status: "success",
            message: "Đặt lại mật khẩu thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleResetPassword = handleResetPassword;
const handleSendOTP = (rawData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const sql_insert_otp = `
      Insert into otp_codes (id, email, otp, type)
      values ('${id}', '${rawData === null || rawData === void 0 ? void 0 : rawData.email}', '${rawData === null || rawData === void 0 ? void 0 : rawData.otp}', '${rawData === null || rawData === void 0 ? void 0 : rawData.type}')
    `;
        const [rows] = yield mysql_1.default.promise().query(sql_insert_otp);
        if (rows.length === 0) {
            return {
                status: "error",
                error_code: "error_send_otp",
                message: "Lỗi khi gửi mã xác thực!",
            };
        }
        return {
            status: "success",
            message: "Gửi mã xác thực thành công!",
        };
    }
    catch (error) {
        console.log(error);
        return define_1.error_server;
    }
});
exports.handleSendOTP = handleSendOTP;
