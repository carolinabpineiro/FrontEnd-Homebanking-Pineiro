import React from 'react';

const Card = ({ accountNumber, amount, creationDate }) => {
  return (
    <div className="bg-green-200 border border-green-300 shadow-md rounded-lg p-4 w-96 mx-2">
      <h2 className="text-xl font-semibold mb-2">Account Information</h2>
      <div className="mb-2">
        <span className="font-medium">Account Number:</span>
        <p>{accountNumber}</p>
      </div>
      <div className="mb-2">
        <span className="font-medium">Amount:</span>
        <p>{amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
      </div>
      <div>
        <span className="font-medium">Creation Date:</span>
        <p>{new Date(creationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Card;