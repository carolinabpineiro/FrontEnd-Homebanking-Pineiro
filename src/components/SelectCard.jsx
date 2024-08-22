import React from 'react';
import CustomButton from './CustomButton';

function SelectCard() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-400 shadow-lg rounded-lg w-3/5 h-4/5 flex">
        {/* Mitad Izquierda */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4">Select Card Type</h2>
          <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>

          <h2 className="text-xl font-semibold mb-4">Select Card Membership (Color)</h2>
          <select className="w-full p-2 border border-gray-300 rounded-md">
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="Titaninum">Titaninum</option>
          </select>

          {/* Botones Centrados */}
          <div className="flex justify-center space-x-4 pt-6">
          <CustomButton text="Apply" bgColor="bg-green-600" hoverColor="hover:bg-green-800" textColor="text-white" />
<CustomButton text="Cancel" bgColor="bg-red-500" hoverColor="hover:bg-red-700" textColor="text-white" />

          </div>
        </div>

        {/* Mitad Derecha */}
        <div className="w-1/2 flex justify-center items-center">
          <img 
            src="/tarjeta-credito.JPG" 
            alt="Card Illustration" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
}

export default SelectCard;
