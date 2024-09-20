import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomButton from '../components/CustomButton';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchAccounts();
  }, []);

  const handleRequestAccount = async () => {
    if (accounts.length >= 3) {
      toast.error("You cannot have more than 3 accounts.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8080/api/accounts/current', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Account requested successfully!");
      // Re-fetch accounts to show the updated list
      const updatedAccounts = await axios.get('http://localhost:8080/api/accounts/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(updatedAccounts.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data);
      } else {
        toast.error('Error requesting account');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, User!</h1>
      <Carousel />
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
        <div className="py-4">
          <CustomButton text="Request Account" onClick={handleRequestAccount} />
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