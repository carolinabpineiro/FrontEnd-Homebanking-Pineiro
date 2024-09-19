import React from 'react';
import CardBlack from '../components/CardBlack';
import CardGold from '../components/CardGold';
import CardPlatinum from '../components/CardPlatinum';
import CustomButton from '../components/CustomButton';

function Cards() {
  return (
    <div className="p-4 bg-cover bg-center" style={{ backgroundImage: "url('/Tarjeta_online.jpg')" }}>
      {/* Contenido de la página Cards */}
      <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-green-800">Your Cards</h1>

      <div className='flex justify-center mb-8'>
        <CustomButton text="Apply for a card" redirectTo="/apply-card" />
      </div>

      {/* Sección de Credit Cards */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-around gap-4">
          <h2 className="text-left text-2xl font-semibold mb-4">Credit:</h2>
          <CardBlack />
          <CardGold />
          <CardPlatinum />
        </div>
      </div>

      {/* Sección de Debit Cards */}
      <div>
        <div className="flex flex-wrap justify-around gap-4">
          <h2 className="text-left text-2xl font-semibold mb-4">Debit:</h2>
          <CardBlack />
          <CardGold />
          <CardPlatinum />
        </div>
      </div>
    </div>
  );
}

export default Cards;