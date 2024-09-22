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
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/transfer.jpg')" }}
    >
      <TransferForm accounts={accounts} onTransferSuccess={loadAccounts} />

      <div className="mt-6">
        {accounts.length > 0 ? (
          accounts.map((account) => (
            <div key={account.id} className="text-white mb-2">
              <h3>{account.number}</h3>
              <p>Balance: ${account.balance}</p>
            </div>
          ))
        ) : (
          <p className="text-white">No accounts available</p>
        )}
      </div>
    </div>
  );
}

export default Transactions;
