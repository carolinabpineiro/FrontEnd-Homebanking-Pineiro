import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoanForm = ({ onLoanApplied }) => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [formData, setFormData] = useState({
    amount: '', 
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

    if (name === 'amount') {
      const formattedAmount = value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
      const amountWithCommas = Number(formattedAmount).toLocaleString('en-US'); // Agrega comas como separador de miles
      setFormData({
        ...formData,
        [name]: amountWithCommas,
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

    const amountValue = parseFloat(formData.amount.replace(/,/g, '')); // Elimina comas y toma el valor numérico
    if (!formData.amount) {
      errors.amount = 'Please enter an amount';
    } else if (amountValue <= 0 || isNaN(amountValue)) {
      errors.amount = 'The amount must be a positive number';
    }

    if (!formData.payments) errors.payments = 'Please select the number of payments';

    const maxAmount = loans.find(loan => loan.id === selectedLoan)?.maxAmount;
    if (maxAmount && amountValue > maxAmount) {
      errors.amount = `Amount cannot exceed`;
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
      amount: parseFloat(formData.amount.replace(/,/g, '')), // Elimina comas antes de enviar el valor numérico
      payments: formData.payments,
      destinationAccount: selectedAccount,
    };

    try {
      setLoading(true);
      setErrors({});
      console.log(loanData);  // Verifica qué datos estás enviando
      const response = await axios.post('https://homebankingpineiro.onrender.com/api/loans/apply', loanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Loan successfully applied!');
      onLoanApplied(selectedAccount, parseFloat(formData.amount));

    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.includes("already applied")) {
          toast.error('You have already applied for this loan');
        } else {
          setErrors(error.response.data);
          toast.error('Error applying for loan!. Amount cannot exceed.');
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
            {loan.name} (Max: ${loan.maxAmount.toLocaleString('en-US')})
          </option>
        ))}
      </select>
      {errors.loan && <p className="text-red-600 font-bold -mt-4 mb-2 rounded-md" 
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
      {errors.account && <p className="text-red-600 font-bold -mt-4 mb-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.account}</p>}

      <label className="text-white">Amount</label>
      <div className="relative">
        <input
          type="text"
          name="amount"
          value={`$${formData.amount}`}  // Muestra el símbolo de pesos
          onChange={handleInputChange}
          onFocus={(e) => e.target.select()} 
          className={`w-full p-3 mb-6 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
        />
      </div>
      {errors.amount && <p className="text-red-600 font-bold -mt-4 mb-2 rounded-md" 
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
              {payment}
            </option>
          ))
        )}
      </select>
      {errors.payments && <p className="text-red-600 font-bold -mt-4 mb-2 rounded-md" 
                 style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{errors.payments}</p>}

      <button
        onClick={handleApplyLoan}
        disabled={loading}
        className="w-full p-3 bg-green-500 text-white font-bold rounded-md shadow hover:bg-green-700 transition duration-300"
      >
        {loading ? 'Applying...' : 'Apply for Loan'}
      </button>
    </div>
  );
};

export default LoanForm;
