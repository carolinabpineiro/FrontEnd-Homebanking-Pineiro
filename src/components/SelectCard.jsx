import React, { useState } from 'react';
import CustomButton from './CustomButton';

function SelectCard({ onApply }) {
  const [cardType, setCardType] = useState('credit');
  const [cardColor, setCardColor] = useState('silver');

  const handleApply = () => {
    const newCard = {
      type: cardType,
      color: cardColor,
    };
    onApply(newCard);
  };

  return (
    <div className="bg-green-700 opacity-90 p-16 rounded-lg shadow-lg w-1/2">
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4 text-white">Select Card Type</h2>
        <select
          className="w-full p-3 mb-6 border border-gray-300 rounded-md"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

        <h2 className="text-xl font-semibold mb-4 text-white">Select Card Membership (Color)</h2>
        <select
          className="w-full p-3 border border-gray-300 rounded-md"
          value={cardColor}
          onChange={(e) => setCardColor(e.target.value)}
        >
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="titanium">Titanium</option>
        </select>

        <div className="flex justify-center space-x-4 pt-6">
          <CustomButton text="Apply" bgColor="bg-green-600" hoverColor="hover:bg-green-800" textColor="text-white" onClick={handleApply} />
          <CustomButton text="Cancel" bgColor="bg-red-500" hoverColor="hover:bg-red-700" textColor="text-white" />
        </div>
      </div>
    </div>
  );
}

export default SelectCard;