import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import TransactionsResume from '../components/TransactionsResume';
import Card from '../components/Card';

const Account = () => {
  const { id } = useParams(); // Obtiene el ID de la cuenta de la URL
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
        setAccount(response.data);
      } catch (err) {
        console.error('Error fetching account:', err);
        setError('Error fetching account');
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full">
      <div className="text-center mt-8 mb-4">
        <h1 className="text-3xl font-bold mb-8">Your Selected Account</h1>
      </div>
      <Carousel />
      <div className='flex space-x-4 justify-center items-center mb-8 mt-8'>
        {account && (
          <Card
            accountNumber={account.number}
            amount={account.balance}
            creationDate={account.creationDate}
          />
        )}
        <TransactionsResume />
      </div>
    </div>
  );
};

export default Account;