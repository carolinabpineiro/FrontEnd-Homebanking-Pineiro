import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const TransferForm = ({ accounts, onTransferSuccess }) => {
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    amount: '',
    description: '',
  });

  const [isExternal, setIsExternal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAccountTypeChange = () => {
    setIsExternal(!isExternal);
    setFormData({ ...formData, destinationAccount: '' });
  };

  const validateForm = () => {
    if (!formData.sourceAccount || !formData.destinationAccount) {
      return 'Source and destination accounts are required.';
    }
    if (formData.sourceAccount === formData.destinationAccount) {
      return 'Source and destination accounts cannot be the same.';
    }
    if (parseFloat(formData.amount) <= 0 || isNaN(parseFloat(formData.amount))) {
      return 'The amount must be a positive number.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/api/transactions',
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
      setError(error.response?.data || error.message);
      console.error('Error details:', error.response?.data || error.message);
      toast.error('Error in transaction');
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
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select an account</option>
            {accounts.map(account => (
              <option key={account.id} value={account.number}>
                {account.number} - Balance: {account.balance}
              </option>
            ))}
          </select>
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
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          ) : (
            <select
              id="destinationAccount"
              name="destinationAccount"
              value={formData.destinationAccount}
              onChange={handleInputChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select an account</option>
              {accounts.map(account => (
                // Solo muestra la cuenta si no es la misma que la fuente
                formData.sourceAccount !== account.number && (
                  <option key={account.id} value={account.number}>
                    {account.number} - Balance: {account.balance}
                  </option>
                )
              ))}
            </select>
          )}
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
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
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
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? 'cursor-not-allowed opacity-70' : ''
          }`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color={"#ffffff"} /> : "Submit Transfer"}
        </button>

        {error && <p className="mt-4 text-red-700 text-bold text-center text-lg">Error: {error}</p>}
      </form>
    </div>
  );
};

export default TransferForm;


