const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactId: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String },
  status: { type: String },
  lastInteraction: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
