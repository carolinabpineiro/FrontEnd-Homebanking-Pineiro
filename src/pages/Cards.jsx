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
  const cards = useSelector((state) => state.cards.cards); // Tarjetas del estado global

  useEffect(() => {
    let isMounted = true;  // Para asegurarte de que no se haga la solicitud si el componente se desmonta

    const fetchCards = async () => {
      const token = localStorage.getItem('token');  // Obtén el token del localStorage
      if (!token) {
        console.error('Token no encontrado en localStorage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/clients/current/cards', {
          headers: {
            Authorization: `Bearer ${token}`,  // Incluye el token en el header
          },
        });

        if (isMounted) {
          console.log('Respuesta:', response.data);  // Verifica los datos que vienen de la API
          dispatch(setCards(response.data));  // Actualiza el estado global de las tarjetas
        }
      } catch (error) {
        console.error('Error al obtener las tarjetas:', error.response ? error.response.data : error.message);
      }
    };

    fetchCards();

    return () => {
      isMounted = false;  // Marca que el componente se desmontó
    };
  }, [dispatch]);  // Asegúrate de incluir `dispatch` en las dependencias para evitar advertencias

  // Filtrado de tarjetas
  const creditCards = cards.filter(card => card.cardType === 'CREDIT');
  const debitCards = cards.filter(card => card.cardType === 'DEBIT');

  return (
    <div className="p-4 bg-cover bg-center h-screen" style={{ backgroundImage: "url('/Tarjeta_online.jpg')" }}>
      <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-green-800">Your Cards</h1>

      <div className='flex justify-center mb-8'>
        <CustomButton text="Apply for a card" redirectTo="/apply-card" />
      </div>

      {cards.length === 0 ? (
        <div className="text-center text-xl text-gray-700">
          You haven't applied for any cards yet. Click the button above to apply!
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Credit Cards</h2>
          <div className="flex flex-wrap justify-around gap-4 mb-8">
            {creditCards.map(card => (
              <CardComponent key={card.id} card={card} />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-green-600">Debit Cards</h2>
          <div className="flex flex-wrap justify-around gap-4">
            {debitCards.map(card => (
              <CardComponent key={card.id} card={card} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente genérico para las tarjetas
const CardComponent = ({ card }) => {
  switch (card.cardColor) {  // Asegúrate de que `cardColor` esté correctamente serializado en el backend
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