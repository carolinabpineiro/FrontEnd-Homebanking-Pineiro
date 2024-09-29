import React, { useState, useEffect } from 'react';
import TransferForm from '../components/TransferForm';
import { fetchAccounts } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de Toastify

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
      className="flex flex-col h-[748px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/transfer.jpg')" }}
    >
      <ToastContainer />
      <div className="flex-grow flex items-start justify-center mt-12 mb-12">
        <TransferForm accounts={accounts} onTransferSuccess={loadAccounts} />
      </div>
    </div>
  );
}

export default Transactions;

