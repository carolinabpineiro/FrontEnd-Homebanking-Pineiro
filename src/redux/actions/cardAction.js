import { createAction } from '@reduxjs/toolkit';

export const addCard = createAction('ADD_CARD');
export const setCards = createAction('SET_CARDS'); // Acción para establecer todas las tarjetas (backend + nuevas)