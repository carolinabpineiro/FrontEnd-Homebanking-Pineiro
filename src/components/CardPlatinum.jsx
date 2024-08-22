import React from 'react'

function CardPlatinum() {
         // Información estática para la tarjeta
  const cardNumber = '9876-5432-1098-7654';
  const cardHolder = 'THOMAS N. MALDONADO'; // Nombre en mayúsculas
  const expiryDate = '11/27';

  return (
    <div className="relative max-w-md w-full h-72">
      {/* Tarjeta con imagen de fondo inicial */}
      <div className="bg-[url('/platinum.JPG')] bg-cover bg-center text-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-between transition duration-300 ease-in-out transform hover:opacity-0">
        {/* Parte superior de la tarjeta */}
        <div className="flex items-center justify-between">
          <img
            src="/chip.png" // Asegúrate de que la ruta sea correcta
            alt="chip"
            className="w-16"
          />
          <div className="text-lg font-semibold">Banking 55</div>
          <img
            src="/visa.png" // Asegúrate de que la ruta sea correcta
            alt="Visa"
            className="w-16"
          />
        </div>

        {/* Número de la tarjeta */}
        <div className="text-xl font-bold tracking-wider flex justify-center">
          {cardNumber.split('').map((char, index) => (
            <span key={index} className="mx-1">
              {char}
            </span>
          ))}
        </div>

        {/* Información de la tarjeta */}
        <div className="flex justify-between text-sm font-mono tracking-widest mt-4">
          <div>{cardHolder}</div>
          <div>{expiryDate}</div>
        </div>
      </div>

      {/* Tarjeta con imagen de fondo alternativo que aparece al pasar el mouse */}
      <div className="absolute inset-0 bg-[url('platinumDorso.png')] bg-cover bg-center text-white rounded-lg shadow-lg p-6 w-full h-full flex flex-col justify-between opacity-0 transition duration-300 ease-in-out transform hover:opacity-100">
     
    </div>

    </div>
  );
};
export default CardPlatinum;
