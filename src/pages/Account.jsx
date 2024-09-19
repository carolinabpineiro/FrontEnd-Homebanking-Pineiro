import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from '../components/Carousel';
import TransactionsResume from '../components/TransactionsResume';
import Card from '../components/Card';

const Account = () => {
  // Datos hardcodeados para simular una cuenta
  const account = {
    number: 'VIN12345678',
    balance: 15000.00,
    creationDate: '2023-09-15'
  };

  return (
    <div className="w-full">
      <div className="text-center mt-8 mb-4">
        <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-green-800">Your Selected Account</h1>
      </div>
      <Carousel />
      <div className="flex space-x-4 justify-center items-center mb-8 mt-8">
        <Card 
          accountNumber={account.number} 
          amount={account.balance} 
          creationDate={account.creationDate} 
        />
        <TransactionsResume />
      </div>
    </div>
  );
};

export default Account;