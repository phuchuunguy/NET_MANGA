"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const notificationController_1 = require("../controllers/notificationController");
const comicController_1 = require("../controllers/comicController");
const searchController_1 = require("../controllers/searchController");
const vipLevelController_1 = require("../controllers/vipLevelController");
const route = express_1.default.Router();
route.get("/info", userController_1.getUserInfo);
route.get("/search", userController_1.findUserByEmailAndTypeAccount);
route.get("/statistics", userController_1.getUserStatistical);
route.get("/rankings", userController_1.getUserRankings);
route.post("/add-feedback", userController_1.addFeedback);
// notification
route.get("/notifications", notificationController_1.getAllNotifications);
route.post("/notification", notificationController_1.createNotification);
route.delete("/notification", notificationController_1.deleteNotification);
// comic
route.get("/comics", comicController_1.getAllComic);
route.post("/comic", comicController_1.saveComic);
route.delete("/comic", comicController_1.deleteComic);
route.delete("/comics", comicController_1.deleteAllComic);
// search
route.get("/search-history", searchController_1.getSearchHistory);
route.post("/search-history", searchController_1.addSearchHistory);
route.delete("/search-history", searchController_1.deleteSearchHistory);
// vip
route.get("/vip-levels", vipLevelController_1.getAllVipLevel);
exports.default = route;
