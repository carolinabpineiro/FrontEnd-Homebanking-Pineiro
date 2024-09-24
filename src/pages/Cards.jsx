import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CardTitanium from '../components/CardTitanium';
import CardGold from '../components/CardGold';
import CardSilver from '../components/CardSilver';
import CustomButton from '../components/CustomButton';
import { setCards } from '../redux/actions/cardAction';

function Cards() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);

  useEffect(() => {
    let isMounted = true;

    const fetchCards = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado en localStorage');
        return;
      }

      try {
        const response = await axios.get('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          dispatch(setCards(response.data));
        }
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error.response ? error.response.data : error.message);
      }
    };

    fetchCards();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const creditCards = cards.filter(card => card.cardType === 'CREDIT');
  const debitCards = cards.filter(card => card.cardType === 'DEBIT');
  
  // Calcular el total de tarjetas
  const totalCards = cards.length;

  return (
    <div className="p-4 bg-cover bg-center h-screen" style={{ backgroundImage: "url('/Tarjeta_online.jpg')" }}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-green-800">Your Cards</h1>
        {totalCards < 6 ? (
          <CustomButton text="Apply for a card" redirectTo="/apply-card" />
        ) : (
          <p className="text-red-500 py-4">You have reached the maximum limit of 6 cards.</p>
        )}
      </div>

      <div className="flex flex-col mt-10">
        <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Credit Cards</h2>
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {creditCards.length > 0 ? (
            creditCards.map(card => (
              <CardComponent key={card.id} card={card} />
            ))
          ) : (
            <p className="text-gray-700 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg text-center">
              You can apply for a credit card if you don't have one yet.
            </p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Debit Cards</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {debitCards.length > 0 ? (
            debitCards.map(card => (
              <CardComponent key={card.id} card={card} />
            ))
          ) : (
            <p className="text-gray-700 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg text-center">
              You can apply for a debit card if you don't have one yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
