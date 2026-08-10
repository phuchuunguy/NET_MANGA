"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initSocketIO = (io) => {
    io.on("connection", (socket) => {
        console.log("Kết nối mới", socket.id);
        socket.on("new-comment", (data) => {
            console.log("Có bình luận mới!");
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
            io.emit("refresh-table-comments", {
                message: "Danh sách bình luận vừa được cập nhật!",
            });
        });
        socket.on("update-comment", (data) => {
            console.log("Có bình luận vừa cập nhật!");
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
            io.emit("refresh-table-comments", {
                message: "Danh sách bình luận vừa được cập nhật!",
            });
        });
        socket.on("delete-comment", (data) => {
            console.log("Có bình luận vừa xóa!");
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
            io.emit("refresh-table-comments", {
                message: "Danh sách bình luận vừa được cập nhật!",
            });
        });
        socket.on("new-feedback", () => {
            console.log("Có phản hồi mới!");
            io.emit("refresh-table-feedbacks", {
                message: "Danh sách phản hồi vừa được cập nhật!",
            });
        });
        socket.on("like-comment", (data) => {
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
            if ((data === null || data === void 0 ? void 0 : data.userLikedId) !== (data === null || data === void 0 ? void 0 : data.userCommentId)) {
                io.emit("new-notification", {
                    message: `${data === null || data === void 0 ? void 0 : data.userLikedName} đã thích bình luận "${data === null || data === void 0 ? void 0 : data.content}" của bạn`,
                    action: "new-notification",
                    userLikedId: data === null || data === void 0 ? void 0 : data.userLikedId,
                    userCommentId: data === null || data === void 0 ? void 0 : data.userCommentId,
                });
            }
            io.emit("refresh-notifications", {
                type: "user",
            });
        });
        socket.on("unlike-comment", (data) => {
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
        });
        socket.on("new-notification", () => {
            console.log("Có thông báo mới!");
            io.emit("refresh-notifications", {
                message: "Có thông báo mới từ hệ thống!",
                action: "new-notification",
                type: "system",
            });
        });
        socket.on("delete-notification", () => {
            console.log("Có thông báo vừa xóa!");
            io.emit("refresh-notifications", {
                action: "delete-notification",
                type: "system",
            });
        });
        socket.on("update-notification", () => {
            console.log("Có thông báo vừa cập nhật!");
            io.emit("refresh-notifications", {
                action: "update-notification",
                type: "system",
            });
        });
        socket.on("update-role", (data) => {
            console.log("Có người dùng vừa được cập nhật vai trò!");
            io.emit("new-notification", {
                userId: data === null || data === void 0 ? void 0 : data.userId,
                message: "Bạn vừa nhận được thông báo mới!!!",
            });
            io.emit("refresh-sesstion", {
                userId: data === null || data === void 0 ? void 0 : data.userId,
                role: data === null || data === void 0 ? void 0 : data.role,
            });
            io.emit("refresh-notifications", {
                type: "user",
            });
        });
        socket.on("update-vip-level", (data) => {
            console.log("Có người dùng vừa được cập nhật cấp độ VIP!");
            io.emit("new-notification", {
                userId: data === null || data === void 0 ? void 0 : data.userId,
                message: "Bạn vừa nhận được thông báo mới!!!",
            });
            io.emit("refresh-sesstion", {
                userId: data === null || data === void 0 ? void 0 : data.userId,
                type: "update-ranking",
            });
            io.emit("refresh-notifications", {
                type: "user",
            });
        });
        socket.on("mark-comment-as-spam", (data) => {
            console.log("Có bình luận vừa được đánh dấu là spam!");
            io.emit("refresh-comments", { slug: data === null || data === void 0 ? void 0 : data.slug });
            if (data === null || data === void 0 ? void 0 : data.isSpam) {
                io.emit("new-notification", {
                    userId: data === null || data === void 0 ? void 0 : data.userId,
                    message: "Bạn vừa nhận được thông báo mới!!!",
                });
                io.emit("refresh-notifications", {
                    type: "user",
                });
            }
        });
        socket.on("disconnect", () => {
            console.log("Ngắt kết nối", socket.id);
        });
    });
};
exports.default = initSocketIO;
