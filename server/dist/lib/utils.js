"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateOTP = exports.checkPassword = exports.hashUserPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashUserPassword = (password, salt) => {
    return bcrypt_1.default.hashSync(password, salt);
};
exports.hashUserPassword = hashUserPassword;
const checkPassword = (password, hashPassword) => {
    return bcrypt_1.default.compareSync(password, hashPassword);
};
exports.checkPassword = checkPassword;
const genarateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.genarateOTP = genarateOTP;
