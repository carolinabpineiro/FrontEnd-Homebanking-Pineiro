import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa el Provider
import { store } from './redux/store'; // Asegúrate de que la ruta sea correcta
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Envolver toda la app con Provider */}
      <App />
    </Provider>
  </StrictMode>
);