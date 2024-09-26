import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoanForm = ({ onLoanApplied }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [formData, setFormData] = useState({
    amount: '', // Eliminar el símbolo $
    payments: '',
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Formatear solo el campo "amount" usando toLocaleString()
    if (name === "amount") {
      const cleanValue = value.replace(/[^0-9]/g, ''); // Eliminar caracteres que no sean números
      const formattedValue = parseInt(cleanValue || '0', 10).toLocaleString(); // Solo formatear con comas
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!selectedLoan) errors.loan = 'Please select a loan';
    if (!selectedAccount) errors.account = 'Please select an account';

    const amountValue = parseFloat(formData.amount.replace(/,/g, '')); // Solo remover comas
    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (amountValue <= 0 || isNaN(amountValue)) {
      errors.amount = 'The amount must be a positive number';
    }

    if (!formData.payments) errors.payments = 'Please select the number of payments';

    const maxAmount = loans.find(loan => loan.id === selectedLoan)?.maxAmount;
    if (maxAmount && amountValue > maxAmount) {
      errors.amount = `Amount cannot exceed $${maxAmount.toLocaleString()}`;
    }

    return errors;
  };

  const handleApplyLoan = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const loanData = {
      id: selectedLoan,
      amount: parseFloat(formData.amount.replace(/,/g, '')), // Remover solo comas
      payments: formData.payments,
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
      onLoanApplied(selectedAccount, parseFloat(formData.amount.replace(/,/g, '')));

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

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg w-3/4 mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Apply for a Loan</h2>

      {errors.general && (
        <div className="text-red-600 font-bold mb-2 p-2 rounded-md" 
        style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>
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
      {errors.loan && <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.loan}</p>}

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
      {errors.account && <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.account}</p>}

      <label className="text-white">Amount</label>
      <div className="relative">
        <input
          type="text"
          name="amount"
          value={formData.amount} 
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()} 
          className={`w-full p-3 mb-6 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
      </div>
      {errors.amount && <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.amount}</p>}

      <label className="text-white">Number of Payments</label>
      <select
        name="payments"
        value={formData.payments}
        onChange={handleInputChange}
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
      {errors.payments && <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.payments}</p>}

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
