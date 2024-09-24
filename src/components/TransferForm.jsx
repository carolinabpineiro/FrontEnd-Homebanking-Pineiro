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

  const [backendErrors, setBackendErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for the field being edited
    setBackendErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendErrors({}); // Reset backend errors

    // Validación para el campo de descripción
    if (!formData.description.trim()) {
      setBackendErrors({ description: 'Description is required.' }); // Mensaje de error predefinido
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://homebankingpineiro.onrender.com/api/transactions',
        {
          sourceAccount: formData.sourceAccount,
          destinationAccount: formData.destinationAccount,
          amount: parseFloat(formData.amount),
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log('Transaction successful:', response.data);
      toast.success('Transaction successful');
      onTransferSuccess();
    } catch (error) {
      const backendErrorMessage = error.response?.data || error.message;
      setBackendErrors(backendErrorMessage); // Asignar errores específicos desde el backend
      console.error('Error details:', backendErrorMessage);
    } finally {
      setLoading(false);
    }
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
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          {backendErrors.sourceAccount && <p className="text-black font-bold">{backendErrors.sourceAccount}</p>}
        </div>

        {/* Destination Account */}
        <div className="mb-4">
          <label htmlFor="destinationAccount" className="block text-sm font-medium text-white">
            Destination Account:
          </label>
          <select
            id="destinationAccount"
            name="destinationAccount"
            value={formData.destinationAccount}
            onChange={handleInputChange}
            className={`mt-1 p-3 w-full border ${backendErrors.destinationAccount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          {backendErrors.destinationAccount && <p className="text-black font-bold">{backendErrors.destinationAccount}</p>}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-white">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className={`mt-1 p-3 w-full border ${backendErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {backendErrors.amount && <p className="text-black font-bold">{backendErrors.amount}</p>}
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
          {backendErrors.description && <p className="text-black font-bold">{backendErrors.description}</p>} {/* Mensaje de error aquí */}
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-3 rounded-md">
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
