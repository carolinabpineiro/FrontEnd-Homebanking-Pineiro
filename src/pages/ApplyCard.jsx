import React from 'react'
import SelectCard from '../components/SelectCard'

function ApplyCard() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/abuela-nieta.jpg')" }}
    >
      {/* Componente SelectCard */}
      <SelectCard />
    </div>
  );
}

export default ApplyCard;
