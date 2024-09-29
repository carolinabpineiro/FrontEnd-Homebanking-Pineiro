import React from 'react';
import LoanForm from '../components/LoanForm';
import { ToastContainer } from 'react-toastify'; // Importar ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar el CSS de Toastify

function Loans() {
  return (
    <div
      className="flex flex-col h-[748px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/loans.jpg')" }}
    >
      <div className="flex-grow flex items-start justify-center mt-12 mb-12">
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

