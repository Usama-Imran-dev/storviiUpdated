import axios from 'axios';
const API_URL = 'http://192.168.100.9:3000'; // Replace with your server URL

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Signup failed');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};
