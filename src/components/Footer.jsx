import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p>&copy; 2024 Banking 55 - By <a href="https://www.linkedin.com/in/carolina-pineiro" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">Carolina Piñeiro</a></p>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="text-white hover:text-gray-400 text-4xl" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="text-white hover:text-gray-400 text-4xl" />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="text-white hover:text-gray-400 text-4xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;