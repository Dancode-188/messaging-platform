import axios from "axios";

const API_URL = "http://localhost:5000/api/chats";

export const getChats = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (token, chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (token, chatId, content) => {
  try {
    const response = await axios.post(`${API_URL}/${chatId}/messages`, {
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    return response.data;
  } catch (error) {
    throw error;
  }
};
