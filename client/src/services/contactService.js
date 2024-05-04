import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentContacts = async () => {
    try{
        const response = await axios.get(`${API_URL}/recent`);
        return response.data;
    }catch(error){
        throw error;
    }
};

export const addContact = async (contactId) => {
  try {
    const response = await axios.post(API_URL, { contactId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
