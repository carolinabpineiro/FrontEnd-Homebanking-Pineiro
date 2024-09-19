import React from 'react';
import LoanForm from '../components/LoanForm';

function Loans() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/loans.jpg')" }}
    >
      {/* Formulario de préstamo */}
      <LoanForm />
    </div>
  );
}

export default Loans;