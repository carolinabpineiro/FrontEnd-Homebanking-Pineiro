import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './reducers/authReducer'; 
import cardReducer from './reducers/cardReducer';

// Configuración del store
const store = configureStore({
  reducer: {
    auth: authReducer, 
    cards: cardReducer,
  },
});

// Exportación de hooks personalizados
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector; // Solo exportamos useSelector, sin tipo

// Exporta el store
export default store; 