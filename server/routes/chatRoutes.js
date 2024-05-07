const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

module.exports = (io) => {
  const chatController = require("../controllers/chatController")(io);

  router.get("/", authMiddleware, chatController.getUserChats);
  router.post("/", authMiddleware, chatController.createChat);
  router.get("/:chatId", authMiddleware, chatController.getChat);
  router.post("/:chatId/messages", authMiddleware, chatController.sendMessage);
  router.get(
    "/:chatId/messages",
    authMiddleware,
    chatController.getChatMessages
  );

  return router;
};
