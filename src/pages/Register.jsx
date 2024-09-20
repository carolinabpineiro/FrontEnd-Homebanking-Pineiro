import React from 'react';
import FormRegister from '../components/FormRegister';

const Register = () => {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/banking55.png')" }}
    >
      <div className="w-2/3 opacity-95">
        <FormRegister />
      </div>
    </div>
  );
};

export default Register;