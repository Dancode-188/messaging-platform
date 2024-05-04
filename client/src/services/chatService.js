import axios from "axios";

const API_URL = "http://localhost:5000/api/chats";

export const getChats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}/messages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (chatId, content) => {
  try {
    const response = await axios.post(`${API_URL}/${chatId}/messages`, {
      content,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
