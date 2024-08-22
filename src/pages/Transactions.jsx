import React from 'react';
import TransferForm from '../components/TransferForm';

function Transactions() {
  return (
    <div className="flex flex-col justify-start h-screen bg-gray-100 p-4">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold mt-8 text-center text-green-800 mb-16">Make a Transaction</h1>
      
      {/* Componente TransferForm */}
      <TransferForm />
    </div>
  );
}

export default Transactions;