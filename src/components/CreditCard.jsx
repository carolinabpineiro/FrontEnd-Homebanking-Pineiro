// import React from 'react';

// const CreditCard = ({ cardNumber, cardHolder, expiryDate }) => {
//   return (
//     <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
//       {/* Parte superior de la tarjeta */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="bg-gray-400 w-10 h-6 rounded-sm"></div>
//         <div className="text-lg font-semibold">Banking 55</div>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/VISA_Logo.svg/1200px-VISA_Logo.svg.png"
//           alt="Visa"
//           className="w-20"
//         />
//       </div>

//       {/* Número de la tarjeta */}
//       <div className="text-3xl font-bold mb-4">
//         {cardNumber.split('').map((char, index) => (
//           <span key={index}>
//             {char === ' ' ? ' ' : char}
//           </span>
//         ))}
//       </div>

//       {/* Información de la tarjeta */}
//       <div className="flex justify-between text-sm">
//         <div>{cardHolder}</div>
//         <div>{expiryDate}</div>
//       </div>
//     </div>
//   );
// };

// export default CreditCard;