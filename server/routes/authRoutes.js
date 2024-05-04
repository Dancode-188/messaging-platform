const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, userController.getUserData);
router.get("/contacts", authMiddleware, userController.getContacts);
router.get("/chats", authMiddleware, userController.getChats);
router.get("/settings", authMiddleware, userController.getSettings);
router.post("/settings", authMiddleware, userController.updateSettings);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
