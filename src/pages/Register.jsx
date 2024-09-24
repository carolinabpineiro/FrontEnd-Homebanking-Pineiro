import React from 'react';
import FormRegister from '../components/FormRegister';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de Toastify

const Register = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banking55.png')" }}
    >
      <div className="w-2/3 opacity-95">
        <FormRegister />
      </div>
      <ToastContainer /> {/* Agrega el ToastContainer aquí */}
    </div>
  );
};

export default Register;
