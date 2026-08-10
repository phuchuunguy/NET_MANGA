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
exports.sendOTP = exports.resetPassword = exports.registerAccount = exports.userLogin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const dotenv_1 = __importDefault(require("dotenv"));
const validator_1 = __importDefault(require("validator"));
const authService_1 = require("../services/authService");
const utils_1 = require("../lib/utils");
const define_1 = require("../lib/define");
dotenv_1.default.config();
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, typeAccount } = req.body;
        if (!email || !password || !typeAccount) {
            return res.status(500).json({
                status: "error",
                message: "Email, Password and TypeAccount are required!",
            });
        }
        const response = yield (0, authService_1.handleLogin)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.userLogin = userLogin;
const registerAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, typeAccount, avatar } = req.body;
        if (!email || !name || !typeAccount || !avatar) {
            return res.status(500).json({
                status: "error",
                message: "Email, Username, TypeAccount and Avatar are required!",
            });
        }
        const response = yield (0, authService_1.handleRegister)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.registerAccount = registerAccount;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp) {
            return res.status(500).json({
                status: "error",
                message: "Email, Password and OTP are required!",
            });
        }
        const response = yield (0, authService_1.handleResetPassword)(req.body);
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.resetPassword = resetPassword;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        if (!validator_1.default.isEmail((_a = req.body) === null || _a === void 0 ? void 0 : _a.email)) {
            return res.status(400).json({
                status: "error",
                error_code: "invalid_email",
                message: "Email không hợp lệ!",
            });
        }
        const otp = (0, utils_1.genarateOTP)();
        const templatePath = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.type) === "register_account"
            ? "../templates/register.html"
            : "../templates/forgot-password.html";
        // Đọc và biên dịch mẫu email
        const filePath = path_1.default.join(__dirname, templatePath);
        const source = fs_1.default.readFileSync(filePath, "utf-8").toString();
        const template = handlebars_1.default.compile(source);
        const replacements = { email: process.env.GOOGLE_APP_EMAIL, otp };
        const htmlToSend = template(replacements);
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_APP_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD,
            },
        });
        yield transporter.sendMail({
            from: `nuyhuphc <${process.env.GOOGLE_APP_EMAIL}>`,
            to: `${(_c = req.body) === null || _c === void 0 ? void 0 : _c.email}`,
            subject: "Xác minh tài khoản",
            text: "nuyhuphc",
            html: htmlToSend,
        });
        const response_send_otp = yield (0, authService_1.handleSendOTP)(Object.assign(Object.assign({}, req.body), { otp }));
        return res.status(200).json(response_send_otp);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(define_1.error_server);
    }
});
exports.sendOTP = sendOTP;
