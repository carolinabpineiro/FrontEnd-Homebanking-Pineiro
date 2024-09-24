import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectCard from '../components/SelectCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de Toastify
import { setCards } from '../redux/actions/cardAction'; // Asegúrate de importar setCards para actualizar las tarjetas
import axios from 'axios';

function ApplyCard() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards); // Obtener tarjetas del estado global
  const [availableCards, setAvailableCards] = useState([]); // Estado local para las tarjetas disponibles
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Función para obtener las tarjetas existentes
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableCards(response.data); // Guardar las tarjetas obtenidas en el estado local
        dispatch(setCards(response.data)); // Actualizar el estado global
      } catch (error) {
        console.error('Error fetching cards:', error);
        toast.error('Error fetching cards. Please try again.'); // Notificación de error
      }
    };

    fetchCards();
  }, [token, dispatch]);

  const handleCardApplication = async (newCard) => {
    // Verificar si ya existe una tarjeta del tipo y color que se quiere aplicar
    const existingCredit = availableCards.some(card => card.cardType === 'CREDIT' && card.cardColor === newCard.color);
    const existingDebit = availableCards.some(card => card.cardType === 'DEBIT' && card.cardColor === newCard.color);

    if (newCard.type === 'credit' && existingCredit) {
      toast.error('You can only have one credit card of each type!');
      return;
    }
    if (newCard.type === 'debit' && existingDebit) {
      toast.error('You can only have one debit card of each type!');
      return;
    }

    try {
      // Solicitud al backend para crear la nueva tarjeta
      const response = await axios.post('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
        type: newCard.type.toUpperCase(), // Asegúrate de enviar el tipo correctamente
        color: newCard.color.toUpperCase(), // Asegúrate de enviar el color correctamente
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mensaje de éxito cuando la tarjeta se crea exitosamente
      toast.success('Card application successful!');

      // Actualizar el estado local y global después de crear una tarjeta
      const updatedCardsResponse = await axios.get('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAvailableCards(updatedCardsResponse.data); // Actualizar las tarjetas en el estado local
      dispatch(setCards(updatedCardsResponse.data)); // Actualizar las tarjetas en el estado global

    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('You already have 3 cards of this type!');
      } else {
        toast.error('Error applying for card');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: "url('/abuela-nieta.jpg')" }}>
      <div className="flex-grow flex items-start justify-center mt-32"> {/* Alineado hacia la parte superior */}
        <SelectCard onApply={handleCardApplication} />
      </div>
    </div>
  );
}

export default ApplyCard;
