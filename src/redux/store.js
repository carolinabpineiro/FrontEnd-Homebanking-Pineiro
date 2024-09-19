import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'; // Importa los hooks
import authReducer from './reducers/authReducers'; // Actualiza la ruta y nombre del archivo
import accountReducer from './reducers/accountReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,  // Aquí pueden agregarse otros reducers en el futuro
  },
});

// Hooks para usar en componentes
export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);