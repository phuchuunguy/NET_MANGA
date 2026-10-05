"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mangaDexController_1 = require("../controllers/mangaDexController");
const route = express_1.default.Router();
route.get("/", mangaDexController_1.getMangaDexData);
exports.default = route;
