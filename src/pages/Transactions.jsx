import React, { useState, useEffect } from 'react';
import TransferForm from '../components/TransferForm';
import { fetchAccounts } from '../utils/api';
import { toast } from 'react-toastify';

function Transactions() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const accountsData = await fetchAccounts();
      if (accountsData) {
        setAccounts(accountsData);
      }
    } catch (error) {
      toast.error('Error loading accounts: ' + (error.response?.data || error.message));
      console.error('Error details:', error);
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/transfer.jpg')" }}
    >
      <div className="flex-grow flex items-start justify-center mt-32"> {/* Alineado hacia la parte superior */}
        <TransferForm accounts={accounts} onTransferSuccess={loadAccounts} />
      </div>
    </div>
  );
}

export default Transactions;