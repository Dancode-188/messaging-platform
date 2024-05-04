const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  displayName: { type: String, required: true },
  profilePicture: { type: String },
  statusMessage: { type: String },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  readReceipts: { type: Boolean, default: true },
  onlineStatus: { type: Boolean, default: true },
  notificationAlerts: { type: Boolean, default: true },
  notificationSounds: { type: Boolean, default: true },
});

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
