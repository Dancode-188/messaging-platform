const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String },
    lastMessageTimestamp: { type: Date },
    unreadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

chatSchema.virtual("name").get(function () {
  return this.participants.map((participant) => participant.name).join(", ");
});

chatSchema.virtual("profilePicture").get(function () {
  // Assuming the first participant's profile picture is used for the chat
  return this.participants[0].profilePicture;
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
