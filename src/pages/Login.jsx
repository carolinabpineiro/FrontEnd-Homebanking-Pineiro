
import React from 'react';
import FormLogin from '../components/FormLogin'; // Asegúrate de que la ruta sea correcta



const Login = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banking55.png')" }}
    >
      <div className="w-2/3 opacity-95"> {/* Tamaño uniforme y opacidad */}
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;