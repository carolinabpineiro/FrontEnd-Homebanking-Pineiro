import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para obtener los detalles de una cuenta
export const fetchAccountDetails = createAsyncThunk(
  'account/fetchAccountDetails',
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/accounts/${accountId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Acción para actualizar el balance de una cuenta
export const updateAccountBalance = createAsyncThunk(
  'account/updateAccountBalance',
  async ({ accountId, newBalance }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/accounts/${accountId}/balance`, { newBalance });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);