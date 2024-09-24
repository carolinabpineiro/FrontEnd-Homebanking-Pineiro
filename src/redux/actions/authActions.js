import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importa toast

const API_URL = 'https://homebankingpineiro.onrender.com/api/auth';

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
        throw new Error('Token not found in the response');
      }

      localStorage.setItem('token', token);
      toast.success('Login successful!'); // Muestra tostada de éxito
      return { token };
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.response?.data || 'Authentication error'); // Muestra tostada de error
      return rejectWithValue(error.response?.data || 'Authentication error');
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
      toast.success('Registration successful!'); // Muestra tostada de éxito
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data || 'Registration error'); // Muestra tostada de error
      return rejectWithValue(error.response?.data || 'Registration error');
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
      toast.error(error.response?.data || 'Error fetching current user'); // Muestra tostada de error
      return rejectWithValue(error.response?.data || 'Error fetching current user');
    }
  }
);
