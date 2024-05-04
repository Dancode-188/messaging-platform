const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getContacts);
router.post("/", contactController.addContact);
router.get("/recent", contactController.getRecentContacts);
router.delete("/:contactId", contactController.removeContact);

module.exports = router;
