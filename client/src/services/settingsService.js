import axios from "axios";

const API_URL = "http://localhost:5000/api/settings";

export const getSettings = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await axios.put(API_URL, settings);
    return response.data;
  } catch (error) {
    throw error;
  }
};
