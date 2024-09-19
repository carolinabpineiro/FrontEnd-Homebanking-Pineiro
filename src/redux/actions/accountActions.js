import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

// Obtener el token de autenticación almacenado en el localStorage (o donde lo tengas guardado)
const token = localStorage.getItem('token');

// Obtener las cuentas del cliente autenticado
export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/current`, {
        headers: {
          'Authorization': `Bearer ${token}`  // Agregar el token en las cabeceras
        }
      });
      return response.data; // Devuelve las cuentas
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener cuentas');
    }
  }
);

// Solicitar una nueva cuenta
export const requestAccount = createAsyncThunk(
  'accounts/requestAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/current`, null, {
        headers: {
          'Authorization': `Bearer ${token}`  // Agregar el token en las cabeceras
        }
      });
      return response.data; // Devuelve la nueva cuenta creada
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al solicitar cuenta');
    }
  }
);