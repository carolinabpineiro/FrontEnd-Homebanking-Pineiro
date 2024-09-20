import { createReducer } from '@reduxjs/toolkit';
import { addCard, setCards } from '../actions/cardAction';

const initialState = {
  cards: [], // Lista de todas las tarjetas (backend + nuevas)
};

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCards, (state, action) => {
      state.cards = action.payload; // Establecer todas las tarjetas (backend)
    })
    .addCase(addCard, (state, action) => {
      state.cards.push(action.payload); // Añadir nueva tarjeta
    });
});

export default cardReducer;