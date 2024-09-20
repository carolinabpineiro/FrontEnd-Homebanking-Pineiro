import React from 'react';
import { useDispatch } from 'react-redux';
import FormLogin from '../components/FormLogin';
import { login } from "../redux/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    // Limpia las tarjetas almacenadas al iniciar sesión
    localStorage.removeItem('cards');

    // Llama a la acción de login
    await dispatch(login(credentials));
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banking55.png')" }}
    >
      <div className="w-2/3 opacity-95">
        {/* Pasamos el handleLogin como prop a FormLogin */}
        <FormLogin onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;