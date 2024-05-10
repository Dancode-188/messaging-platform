import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

export const getContacts = async (token) => {
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

export const getRecentContacts = async (token) => {
    try{
        const response = await axios.get(`${API_URL}/recent`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        return response.data;
    }catch(error){
        throw error;
    }
};

export const addContact = async (token, contactId) => {
  try {
    const response = await axios.post(
      API_URL,
      { contactId },
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
