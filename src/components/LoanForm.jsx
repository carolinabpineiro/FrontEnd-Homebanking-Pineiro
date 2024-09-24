import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoanForm = ({ onLoanApplied }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('https://homebankingpineiro.onrender.com/api/loans/loansAvailable', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
        toast.error('Error fetching loans');
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await axios.get('https://homebankingpineiro.onrender.com/api/accounts/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        toast.error('Error fetching accounts');
      }
    };

    fetchLoans();
    fetchAccounts();
  }, [token]);

  const handleApplyLoan = async () => {
    const loanData = {
      id: selectedLoan,
      amount: parseFloat(amount),
      payments: payments,
      destinationAccount: selectedAccount,
    };

    try {
      setLoading(true);
      const response = await axios.post('https://homebankingpineiro.onrender.com/api/loans/apply', loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data);

      const loanAmount = parseFloat(amount);
      onLoanApplied(selectedAccount, loanAmount);
    } catch (error) {
      console.error('Error applying for loan:', error);
      toast.error('Error applying for loan: ' + error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg w-3/4 mx-auto"> {/* Ajustado al 75% de ancho */}
      <h2 className="text-3xl font-bold text-center text-white mb-6">Apply for a Loan</h2>

      <select
        value={selectedLoan}
        onChange={(e) => setSelectedLoan(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select a loan</option>
        {loans.map((loan) => (
          <option key={loan.id} value={loan.id}>
            {loan.name} (Max: ${loan.maxAmount})
          </option>
        ))}
      </select>

      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.number}>
            {account.number}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        className="w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />

      <select
        value={payments}
        onChange={(e) => setPayments(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select number of payments</option>
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
        className={`w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Apply'}
      </button>
    </div>
  );
};

export default LoanForm;
