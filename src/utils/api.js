import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchAccounts = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Token is missing. Please log in again.');
    return [];
  }

  try {
    const response = await axios.get('https://homebankingpineiro.onrender.com/api/accounts/current', {
      headers: {
        Authorization: `Bearer ${token}`, // Asegúrate de usar comillas invertidas
      },
    });
    return response.data;
  } catch (error) {
    toast.error('Error loading accounts: ' + (error.response?.data || error.message));
    console.error('Error details:', error);
    return [];
  }
};