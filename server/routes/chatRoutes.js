const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.createChat);
router.get("/:chatId", chatController.getChat);
router.post("/:chatId/messages", chatController.sendMessage);

module.exports = router;
