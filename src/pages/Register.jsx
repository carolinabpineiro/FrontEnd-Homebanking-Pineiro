import React from 'react';
import FormRegister from '../components/FormRegister'; // Asegúrate de que la ruta sea correcta

const Register = () => {
  return (
    <div
    className="flex justify-center items-center h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/fondo3.png')" }}
  >
    <div className="flex justify-center items-center h-screen">
      <FormRegister />
    </div>
  </div>
  );
};

export default Register;