const Message = require("../models/Message");

const createMessage = async (sender, recipient, content) => {
  const message = new Message({
    sender,
    recipient,
    content,
  });
  await message.save();
  return message;
};

const getMessagesByChatId = async (chatId) => {
  const messages = await Message.find({ chatId });
  return messages;
};

module.exports = {
  createMessage,
  getMessagesByChatId,
};
