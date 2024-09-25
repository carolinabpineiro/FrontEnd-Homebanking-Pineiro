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
  const [errors, setErrors] = useState({});
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
        setErrors({ general: 'Error fetching loans' });
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
        setErrors({ general: 'Error fetching accounts' });
      }
    };

    fetchLoans();
    fetchAccounts();
  }, [token]);

  const handleApplyLoan = async () => {
    const newErrors = {};

    // Validaciones
    if (!selectedLoan) newErrors.loan = 'Please select a loan';
    if (!selectedAccount) newErrors.account = 'Please select an account';
    if (!amount) newErrors.amount = 'Please enter an amount';
    if (parseFloat(amount.replace(/[$,]/g, '')) <= 0) newErrors.amount = 'The amount must be greater than 0'; // Validación para mayor que 0
    if (!payments) newErrors.payments = 'Please select the number of payments';

    const maxAmount = loans.find(loan => loan.id === selectedLoan)?.maxAmount;
    if (maxAmount && parseFloat(amount.replace(/[$,]/g, '')) > maxAmount) {
      newErrors.amount = `Amount cannot exceed $${maxAmount.toLocaleString()}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loanData = {
      id: selectedLoan,
      amount: parseFloat(amount.replace(/[$,]/g, '')), // Convertir a número sin comas
      payments: payments,
      destinationAccount: selectedAccount,
    };

    try {
      setLoading(true);
      setErrors({});
      const response = await axios.post('https://homebankingpineiro.onrender.com/api/loans/apply', loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Loan successfully applied!');
      onLoanApplied(selectedAccount, parseFloat(amount.replace(/[$,]/g, '')));

    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.includes("already applied")) {
          toast.error('You have already applied for this loan');
        } else {
          setErrors(error.response.data);
          toast.error('Error applying for loan!');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en el campo "Amount"
  const handleAmountChange = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, ''); // Permitimos solo números
    const numericValue = inputValue ? parseFloat(inputValue) : 0; // Convertimos a número
    setAmount(numericValue.toLocaleString()); // Formateamos con separadores de miles
  };

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg w-3/4 mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Apply for a Loan</h2>

      {errors.general && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {errors.general}
        </div>
      )}

      <label className="text-white">Loan</label>
      <select
        value={selectedLoan}
        onChange={(e) => setSelectedLoan(e.target.value)}
        className={`w-full p-3 mb-6 border ${errors.loan ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
      >
        <option value="">Select a loan</option>
        {loans.map((loan) => (
          <option key={loan.id} value={loan.id}>
            {loan.name} (Max: ${loan.maxAmount})
          </option>
        ))}
      </select>
      {errors.loan && <p className="text-black font-bold mb-2">{errors.loan}</p>}

      <label className="text-white">Account</label>
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        className={`w-full p-3 mb-6 border ${errors.account ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
      >
        <option value="">Select an account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.number}>
            {account.number}
          </option>
        ))}
      </select>
      {errors.account && <p className="text-black font-bold">{errors.account}</p>}

      <label className="text-white">Amount</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-500">$</span>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter Amount"
          className={`w-full p-3 pl-8 mb-6 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
      </div>
      {errors.amount && <p className="text-black font-bold">{errors.amount}</p>}

      <label className="text-white">Number of Payments</label>
      <select
        value={payments}
        onChange={(e) => setPayments(e.target.value)}
        className={`w-full p-3 mb-6 border ${errors.payments ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
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
      {errors.payments && <p className="text-black font-bold">{errors.payments}</p>}

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


