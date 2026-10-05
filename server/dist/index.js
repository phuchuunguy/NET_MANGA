"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const comicRouter_1 = __importDefault(require("./routes/comicRouter"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
const mangaDexRouter_1 = __importDefault(require("./routes/mangaDexRouter"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const socket_1 = __importDefault(require("./lib/socket"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"],
    },
});
// check connect database
(0, mongodb_1.default)();
// config .env
dotenv_1.default.config();
// config cors
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
}));
// config body-parser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// defind routes
app.use("/user", userRouter_1.default);
app.use("/auth", authRouter_1.default);
app.use("/comic", comicRouter_1.default);
app.use("/mangadex", mangaDexRouter_1.default);
// admin router
app.use("/admin", adminRouter_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
(0, socket_1.default)(io);
server.listen(port, () => {
    console.log(`[server]: Server đang hoạt động tại: http://localhost:${port}`);
});
