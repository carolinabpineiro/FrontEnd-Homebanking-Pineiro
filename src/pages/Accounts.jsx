import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/actions/authActions';
import axios from 'axios';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { toast } from 'react-toastify';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Obtener el usuario actual

  useEffect(() => {
    fetchAccounts();
    dispatch(fetchCurrentUser()); // Llama a la acción para obtener el usuario actual
  }, [dispatch]);

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/accounts/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Error fetching accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccount = async () => {
    if (accounts.length >= 3) {
      toast.error("You cannot have more than 3 accounts.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/api/accounts/current', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualiza el estado local con la nueva cuenta
      setAccounts([...accounts, response.data]);
      toast.success("Account requested successfully!");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data);
      } else {
        toast.error('Error requesting account');
      }
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualiza el estado para eliminar la cuenta
      setAccounts(accounts.filter(account => account.id !== id));
      toast.success("Account deleted successfully!");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data); // Mostrar el mensaje de error del servidor
      } else {
        toast.error('Error deleting account');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}!</h1>
      <Carousel />
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
        <div className="py-4">
          <CustomButton text="Request Account" onClick={handleRequestAccount} />
        </div>
        <div className="flex space-x-4">
          {accounts.map(account => (
            <div key={account.id} className="flex-none">
              <Link to={`/account/${account.id}`}>
                <Card
                  accountNumber={account.number}
                  amount={account.balance}
                  creationDate={account.creationDate}
                />
              </Link>
              <button 
                onClick={() => handleDeleteAccount(account.id)} 
                className="text-red-500 mt-2">
                Delete Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
