// src/api.js
import axios from 'axios';

// Create an Axios instance with base URL
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Dynamically set the API URL based on your environment variables
  withCredentials: true,  // Ensure cookies are sent with requests if needed
});