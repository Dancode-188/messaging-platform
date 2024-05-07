const Message = require("../models/Message");
const { encrypt } = require("./encryptionService");

const createMessage = async (sender, chatId, content) => {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const encryptedContent = encrypt(content, encryptionKey);

  const message = new Message({
    sender,
    chat: chatId,
    content: encryptedContent,
    encrypted: true,
    delivered: false,
  });

  await message.save();
  return message;
};

const getMessagesByChatId = async (chatId) => {
  const messages = await Message.find({ chat: chatId }).sort({ timestamp: 1 });
  return messages;
};

const markMessageAsDelivered = async (messageId) => {
  await Message.findByIdAndUpdate(messageId, { delivered: true });
};

module.exports = {
  createMessage,
  getMessagesByChatId,
  markMessageAsDelivered,
};
