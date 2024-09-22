import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL base de la API para desarrollo local
const BASE_URL = "http://localhost:8080/api";

// Función para obtener los headers de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Acción para establecer los datos del cliente (no la usaremos aquí, pero está bien tenerla)
export const setClientData = createAction("client/setClientData");

// Thunk para cargar los datos del cliente
export const fetchClientData = createAsyncThunk(
  "client/fetchClientData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/client/data`, getAuthHeaders());
      return response.data; // Devuelve los datos del cliente
    } catch (error) {
      console.error("Error fetching client data:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);