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
  const [backendErrors, setBackendErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleAccountTypeChange = () => {
    setIsExternal(!isExternal);
    setFormData({ ...formData, destinationAccount: '' });
  };

  const validateForm = () => {
    let errors = {};
    
    if (!formData.sourceAccount) {
      errors.sourceAccount = 'Source account is required.';
    }
    if (!formData.destinationAccount) {
      errors.destinationAccount = 'Destination account is required.';
    }
    if (formData.sourceAccount === formData.destinationAccount) {
      errors.destinationAccount = 'Source and destination accounts cannot be the same.';
    }
    if (parseFloat(formData.amount) <= 0 || isNaN(parseFloat(formData.amount))) {
      errors.amount = 'The amount must be a positive number.';
    }
    if (!formData.description) {
      errors.description = 'Description is required.'; // Agregado para la descripción
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setBackendErrors({});
    setTouched({}); // Reiniciar campos tocados para que se muestren errores al enviar

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setBackendErrors(validationErrors);
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
      setError(backendErrorMessage);
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
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className={`mt-1 p-3 w-full border ${backendErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
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
            className={`mt-1 p-3 w-full border ${backendErrors.description && (Object.keys(backendErrors).length > 0) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {/* Mostrar el mensaje de error solo si el campo description está vacío y se ha intentado enviar el formulario */}
          {backendErrors.description && (Object.keys(backendErrors).length > 0) && (
            <p className="text-black font-bold">{backendErrors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color={"#ffffff"} /> : "Submit Transfer"}
        </button>

        {error && <p className="mt-4 text-black font-bold text-center text-lg">{error}</p>}
      </form>
    </div>
  );
};

export default TransferForm;

