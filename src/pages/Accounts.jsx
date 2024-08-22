import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import Carousel from '../components/Carousel';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

const malvaAccountsIds = [1, 2]; // IDs de cuentas de Melva

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/accounts');
        // Filtra las cuentas que tienen ID en malvaAccountsIds
        const filteredAccounts = response.data.filter(account => malvaAccountsIds.includes(account.id));
        setAccounts(filteredAccounts);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Error fetching accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, Thomas!</h1>
      <Carousel />
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
        <div className="py-4">
          <CustomButton text="Request Account" />
        </div>
        <div className="flex space-x-4">
          {accounts.map(account => (
            <Link key={account.id} to={`/account/${account.id}`} className="flex-none">
              <Card
                accountNumber={account.number}
                amount={account.balance}
                creationDate={account.creationDate}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;