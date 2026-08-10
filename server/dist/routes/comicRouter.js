"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const route = express_1.default.Router();
route.get("/comments", commentController_1.getComments);
route.post("/comment", commentController_1.createComment);
route.delete("/comment", commentController_1.deleteComment);
route.put("/comment/:id", commentController_1.updateComment);
route.post("/comment/like", commentController_1.likeComment);
route.delete("/comment/unlike", commentController_1.unlikeComment);
exports.default = route;
