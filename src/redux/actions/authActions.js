import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Acción para iniciar sesión
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      
      console.log('Response completa:', response); 
      console.log('Response data (token):', response.data); 

      const token = response.data;

      if (!token) {
        throw new Error('Token not found in the response'); // Mensaje en inglés
      }

      localStorage.setItem('token', token);
      return { token }; 
    } catch (error) {
      console.error('Authentication error:', error);
      return rejectWithValue(error.response?.data || 'Authentication error'); // Mensaje en inglés
    }
  }
);

// Acción para registrar un nuevo usuario
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, credentials);
      console.log('Registration successful:', response.data); 
      return response.data; 
    } catch (error) {
      console.error('Registration error:', error);
      return rejectWithValue(error.response?.data || 'Registration error'); // Mensaje en inglés
    }
  }
);

// Acción para obtener el usuario actual
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching current user'); // Mensaje en inglés
    }
  }
);