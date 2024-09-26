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

    if (name === "amount") {
      // Permitir solo números y formatear
      const cleanValue = value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
      setFormData({
        ...formData,
        [name]: cleanValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const formatAmount = (value) => {
    if (!value) return '';
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return '';
    return `$${numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleBlur = () => {
    setFormData({
      ...formData,
      amount: formData.amount, // Se asegura que el monto esté limpio
    });
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
    const amountValue = parseFloat(formData.amount);
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
          amount: parseFloat(formData.amount), // Convertir el valor a número
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      // Mostrar la respuesta en la consola
      console.log('Transaction response:', response.data);

      toast.success('Transaction successful');
      onTransferSuccess();
    } catch (error) {
      const backendErrorMessage = error.response?.data || error.message;
      toast.error(backendErrorMessage);
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
            <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
            style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{backendErrors.sourceAccount}</p>
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
            <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
            style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{backendErrors.destinationAccount}</p>
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
            value={formatAmount(formData.amount)} // Formatear el monto al mostrarlo
            onChange={handleInputChange}
            onFocus={(e) => e.target.select()} // Seleccionar texto al hacer foco
            onBlur={handleBlur} // Asegurarse que el monto esté limpio
            className={`p-3 w-full border ${backendErrors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {backendErrors.amount && (
            <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
            style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{backendErrors.amount}</p>
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
            <p className="text-red-600 font-bold mb-2 p-2 rounded-md" 
            style={{ textShadow: '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black' }}>{backendErrors.description}</p>
          )}
        </div>

        <button type="submit" className="mt-4 p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
