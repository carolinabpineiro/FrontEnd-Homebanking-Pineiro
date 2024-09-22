import { createSlice } from "@reduxjs/toolkit";
import { fetchClientData } from "./clientActions";

// Slice del cliente
const clientSlice = createSlice({
  name: 'client',
  initialState: {
    data: {
      accounts: [],
      cards: [],
      loans: [],
      transactions: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearClientData: (state) => {
      state.data = {
        accounts: [],
        cards: [],
        loans: [],
        transactions: [],
      }; // Limpia los datos del cliente
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Actualiza los datos del cliente
        console.log("Fetched client data:", action.payload); // Log para depuración
      })
      .addCase(fetchClientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Establece el error
      });
  },
});

// Exportar acciones y reducer
export const { clearClientData } = clientSlice.actions;
export default clientSlice.reducer;