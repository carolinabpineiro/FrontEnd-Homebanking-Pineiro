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
      console.log('Response data (token):', response.data); // Aquí el token

      // Ya no estamos buscando "response.data.token", simplemente tomamos el "response.data"
      const token = response.data;

      if (!token) {
        throw new Error('Token no encontrado en la respuesta');
      }

      localStorage.setItem('token', token);
      return { token }; // Retorna solo el token
    } catch (error) {
      console.error('Error en la autenticación:', error);
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
      console.log('Registro exitoso:', response.data); // Verifica la respuesta
      return response.data; // Retorna la respuesta
    } catch (error) {
      console.error('Error en el registro:', error);
      return rejectWithValue(error.response?.data || 'Error en el registro');
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
      return response.data; // Retorna los datos del usuario
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener el usuario');
    }
  }
);