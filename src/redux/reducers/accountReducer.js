import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts, requestAccount } from '../actions/accountActions';

const accountSlice = createSlice({
  name: 'accounts',
  initialState: {
    accounts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(requestAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts.push(action.payload); // Añade la nueva cuenta al estado
      })
      .addCase(requestAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;