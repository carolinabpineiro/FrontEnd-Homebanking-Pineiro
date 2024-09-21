import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoanForm() {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/loans/loansAvailable', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
        toast.error('Error fetching loans: ' + error.response?.data || error.message);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/accounts/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        toast.error('Error fetching accounts: ' + error.response?.data || error.message);
      }
    };

    fetchLoans();
    fetchAccounts();
  }, [token]);

  const handleLoanChange = (e) => {
    const selectedId = e.target.value;
    const selected = loans.find(loan => loan.id.toString() === selectedId); // Asegurarse de comparar correctamente
    setSelectedLoan(selectedId);
    setPayments(selected && selected.payments.length > 0 ? selected.payments[0] : ''); // Establece el primer pago disponible
  };

  const handleApplyLoan = async () => {
    const loanData = {
      id: selectedLoan,
      amount: parseFloat(amount),
      payments: payments,
      destinationAccount: selectedAccount,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/loans/apply', loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data); // Notificación de éxito
      // Aquí puedes actualizar el balance si es necesario
    } catch (error) {
      console.error('Error applying for loan:', error);
      toast.error('Error applying for loan: ' + error.response.data);
    }
  };

  return (
    <div className="bg-green-700 opacity-90 p-24 rounded-lg shadow-lg w-1/2">
      <h2 className="text-xl font-semibold mb-4 text-white">Select Loan:</h2>
      <select
        value={selectedLoan}
        onChange={handleLoanChange}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
      >
        <option value="">Select a loan</option>
        {loans.map((loan) => (
          <option key={loan.id} value={loan.id}>
            {loan.name} (Max: ${loan.maxAmount})
          </option>
        ))}
      </select>

      <h2 className="text-xl font-semibold mb-4 text-white">Source Account:</h2>
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.number}>
            {account.number}
          </option>
        ))}
      </select>

      <h2 className="text-xl font-semibold mb-4 text-white">Amount:</h2>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
      />

      <h2 className="text-xl font-semibold mb-4 text-white">Payment:</h2>
      <select
        value={payments}
        onChange={(e) => setPayments(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
      >
        {selectedLoan && loans.length > 0 && (
          loans.find(loan => loan.id.toString() === selectedLoan)?.payments.map((payment) => (
            <option key={payment} value={payment}>
              {payment} months
            </option>
          ))
        )}
      </select>

      <button
        onClick={handleApplyLoan}
        className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
      >
        Apply for Loan
      </button>
    </div>
  );
}

export default LoanForm;