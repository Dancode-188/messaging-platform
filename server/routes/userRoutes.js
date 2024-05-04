const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, userController.getUserData);
router.get("/contacts", authMiddleware, userController.getContacts);
router.get("/chats", authMiddleware, userController.getChats);
router.get("/settings", authMiddleware, userController.getSettings);
router.post("/settings", authMiddleware, userController.updateSettings);

module.exports = router;
