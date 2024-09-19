import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// Acción para iniciar sesión
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { token, user } = response.data; // Asumimos que la respuesta contiene token y usuario
      localStorage.setItem('token', token);
      return { token, user }; // Retornamos un objeto con el token y el usuario
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error en la autenticación');
    }
  }
);

// Acción para registrar un nuevo usuario
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, credentials);
      return response.data; // Puedes retornar algún mensaje o datos si es necesario
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error en el registro');
    }
  }
);