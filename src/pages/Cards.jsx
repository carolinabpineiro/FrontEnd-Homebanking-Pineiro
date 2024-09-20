import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardTitanium from '../components/CardTitanium';
import CardGold from '../components/CardGold';
import CardSilver from '../components/CardSilver';
import CustomButton from '../components/CustomButton';

function Cards() {
  const [creditCards, setCreditCards] = useState([]);
  const [debitCards, setDebitCards] = useState([]);
  const token = localStorage.getItem('token'); // Obtener el token del localStorage

  useEffect(() => {
    // Función para obtener las tarjetas del cliente autenticado
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/clients/current/cards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cards = response.data;

        // Filtrar las tarjetas por tipo (Crédito y Débito)
        const credit = cards.filter(card => card.cardType === 'CREDIT');
        const debit = cards.filter(card => card.cardType === 'DEBIT');

        setCreditCards(credit);
        setDebitCards(debit);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [token]);

  return (
    <div className="p-4 bg-cover bg-center" style={{ backgroundImage: "url('/Tarjeta_online.jpg')" }}>
      <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-green-800">Your Cards</h1>

      <div className='flex justify-center mb-8'>
        <CustomButton text="Apply for a card" redirectTo="/apply-card" />
      </div>

      {/* Sección de Credit Cards */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-around gap-4">
          {creditCards.map(card => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Sección de Debit Cards */}
      <div>
        <div className="flex flex-wrap justify-around gap-4">
          {debitCards.map(card => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente genérico para las tarjetas
const CardComponent = ({ card }) => {
  switch (card.cardColor) {
    case 'GOLD':
      return <CardGold card={card} />;
    case 'TITANIUM':
      return <CardTitanium card={card} />;
    case 'SILVER':
      return <CardSilver card={card} />;
    default:
      return null;
  }
};

export default Cards;