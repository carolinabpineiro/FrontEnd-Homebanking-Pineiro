import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomButton from '../components/CustomButton';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const malvaAccountsIds = [1, 2];

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hardcodedAccounts = [
    { id: 1, number: 'VIN12345678', balance: 15000.00, creationDate: '2023-09-15' },
    { id: 2, number: 'VIN87654321', balance: 8000.00, creationDate: '2023-08-10' },
  ];

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Simula la petición GET a la API con datos hardcodeados
        // Aquí reemplazarías la línea siguiente con la petición real cuando esté disponible
        // const response = await axios.get('http://localhost:8080/api/accounts');
        
        const filteredAccounts = hardcodedAccounts.filter(account => malvaAccountsIds.includes(account.id));

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

  const handleRequestAccount = () => {
    Swal.fire({
      title: 'Request Account',
      text: 'Do you want to request a new account? This action cannot be undone.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, request it!',
      cancelButtonText: 'No, cancel',
      customClass: {
        container: 'custom-swal',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Requested!',
          text: 'Your account request has been submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, Thomas!</h1>
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