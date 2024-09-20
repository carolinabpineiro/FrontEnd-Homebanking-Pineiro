import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from "../components/Card";
import TransactionsResume from '../components/TransactionsResume';
import Carousel from '../components/Carousel';

const Account = () => {
  const { id } = useParams(); // Obtiene el ID de la cuenta de los parámetros de la URL
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('token');

        // Obtener la cuenta
        const accountResponse = await axios.get(`http://localhost:8080/api/accounts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccount(accountResponse.data);

        // Obtener las transacciones de la cuenta
        const transactionsResponse = await axios.get(`http://localhost:8080/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(transactionsResponse.data);
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
        <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-green-800">Your Selected Account</h1>
      </div>
      <Carousel />
      <div className="flex space-x-4 justify-center items-center mb-8 mt-8">
        {account && (
          <Card 
            accountNumber={account.number} 
            amount={account.balance} 
            creationDate={account.creationDate} 
          />
        )}
        <TransactionsResume transactions={transactions} />
      </div>
    </div>
  );
};

export default Account;