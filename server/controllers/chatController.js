const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { decrypt } = require("../services/encryptionService");
const {
  createMessage,
  getMessagesByChatId,
  markMessageAsDelivered,
} = require("../services/messagingService");


module.exports = (io) => {
  const exports = {};

  exports.getChatMessages = async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await getMessagesByChatId(chatId);

      // Decrypt the message content before sending it back to the client
      const encryptionKey = process.env.ENCRYPTION_KEY;
      const decryptedMessages = messages.map((message) => {
        if (message.encrypted) {
          const decryptedContent = decrypt(message.content, encryptionKey);
          return { ...message.toObject(), content: decryptedContent };
        }
        return message;
      });

      res.json(decryptedMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.sendMessage = async (req, res) => {
    try {
      const { chatId } = req.params;
      const { content } = req.body;

      const newMessage = await createMessage(req.user._id, chatId, content);

      res.status(201).json(newMessage);

      // Emit a socket event to notify the recipients about the new message
      io.to(chatId).emit("new_message", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.markMessageAsDelivered = async (messageId) => {
    try {
      await markMessageAsDelivered(messageId);
      console.log(`Message ${messageId} marked as delivered`);
    } catch (error) {
      console.error("Error marking message as delivered:", error);
    }
  };

  exports.getUserChats = async (req, res) => {
    try {
      const chats = await Chat.find({ participants: req.user._id })
        .populate("participants", "name profilePicture")
        .sort({ updatedAt: -1 });
      res.json(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.getChat = async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await Chat.findById(chatId).populate(
        "participants",
        "name profilePicture"
      );
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      console.error("Error fetching chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.createChat = async (req, res) => {
    try {
      const { participantIds } = req.body;

      // Check if participantIds is an array
      if (!Array.isArray(participantIds)) {
        return res
          .status(400)
          .json({ error: "participantIds must be an array" });
      }

      // Create a new chat
      const newChat = new Chat({
        participants: [...participantIds, req.user._id],
      });
      // Save the chat to the database
      const savedChat = await newChat.save();
      res.status(201).json(savedChat);
    } catch (error) {
      console.error("Error creating chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  return exports;
};