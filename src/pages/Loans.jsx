import React from 'react';
import LoanForm from '../components/LoanForm';
import { ToastContainer } from 'react-toastify'; // Importar ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar el CSS de Toastify

function Loans() {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/loans.jpg')" }}
    >
      <div className="flex-grow flex items-start justify-center mt-32">
        <div className="w-full max-w-6xl"> {/* Cambiado a max-w-6xl para un mayor ancho */}
          <LoanForm />
        </div>
      </div>

      {/* Agregar el ToastContainer aquí */}
      <ToastContainer />
    </div>
  );
}

export default Loans;

