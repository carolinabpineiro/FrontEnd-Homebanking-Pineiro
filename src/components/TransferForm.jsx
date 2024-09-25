import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransferForm = ({ accounts, onTransferSuccess }) => {
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    amount: '',
    description: '',
  });

  const [isExternal, setIsExternal] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Solo formatear el campo de amount
    if (name === 'amount') {
      // Formatear el valor a medida que se escribe
      const formattedAmount = formatCurrency(value);
      setFormData({
        ...formData,
        [name]: formattedAmount,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAccountTypeChange = () => {
    setIsExternal(!isExternal);
    setFormData({ ...formData, destinationAccount: '' });
  };

  const validateForm = () => {
    let errors = {};
    // Validación para sourceAccount
    if (!formData.sourceAccount) {
      errors.sourceAccount = 'Source account is required.';
    }
    // Validación para destinationAccount
    if (!formData.destinationAccount) {
      errors.destinationAccount = 'Destination account is required.';
    }
    if (formData.sourceAccount === formData.destinationAccount) {
      errors.destinationAccount = 'Source and destination accounts cannot be the same.';
    }
    // Validación para amount
    const amountValue = parseFloat(formData.amount.replace(/[$,]/g, '')); // Remove $ and commas
    if (!formData.amount) {
      errors.amount = 'Amount is required.';
    } else if (amountValue <= 0 || isNaN(amountValue)) {
      errors.amount = 'The amount must be a positive number.';
    }
    // Validación para description
    if (!formData.description) {
      errors.description = 'Description is required.';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setBackendErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://homebankingpineiro.onrender.com/api/transactions',
        {
          sourceAccount: formData.sourceAccount,
          destinationAccount: formData.destinationAccount,
          amount: parseFloat(formData.amount.replace(/[$,]/g, '')), // Send clean number
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      toast.success('Transaction successful');
      onTransferSuccess();
    } catch (error) {
      const backendErrorMessage = error.response?.data || error.message;
      toast.error(backendErrorMessage);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    // Remueve todo lo que no sea dígito
    const numericValue = value.replace(/[^0-9]/g, '');
    // Formatea con separadores de miles
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg w-1/2 mx-auto">
      <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Make a Transaction</h2>

        {/* Source Account */}
        <div className="mb-4">
          <label htmlFor="sourceAccount" className="block text-sm font-medium text-white">
            Source Account:
          </label>
          <select
            id="sourceAccount"
            name="sourceAccount"
            value={formData.sourceAccount}
            onChange={handleInputChange}
            className={`mt-1 p-3 w-full border ${backendErrors.sourceAccount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select an account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.number}>
                {account.number} - Balance: {account.balance}
              </option>
            ))}
          </select>
          {backendErrors.sourceAccount && (
            <p className="text-black font-bold">{backendErrors.sourceAccount}</p>
          )}
        </div>

        {/* Option to select external account */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isExternal}
              onChange={handleAccountTypeChange}
              className="mr-2"
            />
            Transfer to an external account
          </label>
        </div>

        {/* Destination Account */}
        <div className="mb-4">
          <label htmlFor="destinationAccount" className="block text-sm font-medium text-white">
            Destination Account:
          </label>
          {isExternal ? (
            <input
              type="text"
              id="destinationAccount"
              name="destinationAccount"
              value={formData.destinationAccount}
              onChange={handleInputChange}
              placeholder="Enter external account"
              className={`mt-1 p-3 w-full border ${backendErrors.destinationAccount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
          ) : (
            <select
              id="destinationAccount"
              name="destinationAccount"
              value={formData.destinationAccount}
              onChange={handleInputChange}
              className={`mt-1 p-3 w-full border ${backendErrors.destinationAccount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select an account</option>
              {accounts.map(account => (
                formData.sourceAccount !== account.number && (
                  <option key={account.id} value={account.number}>
                    {account.number} - Balance: {account.balance}
                  </option>
                )
              ))}
            </select>
          )}
          {backendErrors.destinationAccount && (
            <p className="text-black font-bold">{backendErrors.destinationAccount}</p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-white">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount} // Muestra el valor sin formatear
            onChange={handleInputChange} // Cambia la lógica aquí
            onFocus={(e) => e.target.select()} // Seleccionar texto al hacer foco
            className={`mt-1 p-3 w-full border text-right ${backendErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {backendErrors.amount && (
            <p className="text-black font-bold">{backendErrors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`mt-1 p-3 w-full border ${backendErrors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {backendErrors.description && (
            <p className="text-black font-bold">{backendErrors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
