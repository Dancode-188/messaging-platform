const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, contactController.getContacts);
router.post("/", authMiddleware, contactController.addContact);
router.get("/recent", authMiddleware, contactController.getRecentContacts);
router.delete("/:contactId", authMiddleware, contactController.deleteContact);

module.exports = router;
