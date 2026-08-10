"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const route = express_1.default.Router();
route.post("/login", authController_1.userLogin);
route.post("/register", authController_1.registerAccount);
route.post("/reset-password", authController_1.resetPassword);
route.post("/send-otp", authController_1.sendOTP);
exports.default = route;
