import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Asegúrate de tener la importación de toast
import axios from 'axios';

const LoanForm = ({ onLoanApplied }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [payments, setPayments] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Estado para almacenar los errores del backend
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
    // Verificar si todos los campos están completos
    const newErrors = {};
    if (!selectedLoan) newErrors.loan = 'Please select a loan';
    if (!selectedAccount) newErrors.account = 'Please select an account';
    if (!amount) newErrors.amount = 'Please enter an amount';
    if (!payments) newErrors.payments = 'Please select the number of payments';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loanData = {
      id: selectedLoan,
      amount: parseFloat(amount),
      payments: payments,
      destinationAccount: selectedAccount,
    };

    try {
      setLoading(true);
      setErrors({}); // Limpiar errores previos antes de hacer una nueva solicitud

      const response = await axios.post('https://homebankingpineiro.onrender.com/api/loans/apply', loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mostrar toast de éxito
      toast.success('Loan successfully applied!');
      onLoanApplied(selectedAccount, parseFloat(amount));

    } catch (error) {
      if (error.response && error.response.data) {
        // Mostrar errores en los campos correspondientes
        setErrors(error.response.data);
        
        // Mostrar toast con mensaje de error general
        toast.error('Error applying for loan!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg w-3/4 mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Apply for a Loan</h2>

      {/* Mostrar errores generales o específicos */}
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
      {errors.loan && <p className="text-black font-bold mb-2">{errors.loan}</p>} {/* Mensaje de error */}

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
      {errors.account && <p className="text-black font-bold">{errors.account}</p>} {/* Mensaje de error */}

      <label className="text-white">Amount</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
        className={`w-full p-3 mb-6 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
      />
      {errors.amount && <p className="text-black font-bold">{errors.amount}</p>} {/* Mensaje de error */}

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
      {errors.payments && <p className="text-black font-bold">{errors.payments}</p>} {/* Mensaje de error */}

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
