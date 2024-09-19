import React from 'react';

import { useNavigate } from 'react-router-dom';

const CustomButton = ({ text, redirectTo, onClick, bgColor = 'bg-green-500', hoverColor = 'hover:bg-green-700', textColor = 'text-white' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Ejecutar la función proporcionada por `onClick`
    }
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${bgColor} ${hoverColor} ${textColor} font-bold py-2 px-4 rounded`}
    >
      {text}
    </button>
  );
};

export default CustomButton;