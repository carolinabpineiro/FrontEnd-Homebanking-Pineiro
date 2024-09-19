import React from 'react';
import TransferForm from '../components/TransferForm';

function Transactions() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/transfer.jpg')" }}
    >
      {/* Componente TransferForm */}
      <TransferForm />
    </div>
  );
}

export default Transactions;