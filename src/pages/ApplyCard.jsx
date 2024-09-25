import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la redirección
import SelectCard from '../components/SelectCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCards } from '../redux/actions/cardAction';
import axios from 'axios';

function ApplyCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usamos navigate para redirigir
  const cards = useSelector((state) => state.cards.cards); 
  const [availableCards, setAvailableCards] = useState([]); 
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableCards(response.data); 
        dispatch(setCards(response.data));
      } catch (error) {
        toast.error('Error fetching cards. Please try again.');
      }
    };

    fetchCards();
  }, [token, dispatch]);

  const handleCardApplication = async (newCard) => {
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
      await axios.post('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
        type: newCard.type.toUpperCase(),
        color: newCard.color.toUpperCase(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Card application successful!');

      // Refrescar las tarjetas disponibles después de la aplicación exitosa
      const updatedCardsResponse = await axios.get('https://homebankingpineiro.onrender.com/api/clients/current/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAvailableCards(updatedCardsResponse.data);
      dispatch(setCards(updatedCardsResponse.data));

      // Redirigir a la página "Cards" después de la aplicación exitosa
      navigate('/cards'); 

    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('You can only have one card of each type and color!');
      } else {
        toast.error('Error applying for card');
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: "url('/abuela-nieta.jpg')" }}>
      <div className="flex-grow flex items-start justify-center mt-32">
        <SelectCard onApply={handleCardApplication} />
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default ApplyCard;
