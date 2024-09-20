import React from 'react';

function CardSilver({ card }) {
  const { cardNumber, cardHolder, thruDate, cvv } = card; // Añadimos 'cvv' del objeto 'card'

  return (
    <div className="relative max-w-md w-full h-72">
      {/* Parte frontal de la tarjeta */}
      <div className="bg-[url('/black.jpg')] bg-cover bg-center text-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-between transition duration-300 ease-in-out transform hover:opacity-0">
        <div className="flex items-center justify-between">
          <img src="/chip.png" alt="chip" className="w-16" />
          <div className="text-lg font-semibold">Banking 55</div>
          <img src="/visa.png" alt="Visa" className="w-16" />
        </div>

        <div className="text-xl font-bold tracking-wider flex justify-center text-shadow" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
          {cardNumber}
        </div>

        <div className="flex justify-between text-lg font-mono tracking-widest mt-4" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
          <div>{cardHolder}</div>
          <div>{new Date(thruDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit' })}</div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('SillverDorso.png')] bg-cover bg-center text-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-between opacity-0 transition duration-300 ease-in-out transform hover:opacity-100">
      <div className="flex justify-end text-xl font-bold tracking-widest text-gray-900 mt-32 mr-12">
  CVV: {cvv}
</div>
      </div>
    </div>
  );
}
      
export default CardSilver;
