import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5566/api'; // Adjust this to match your backend URL

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;