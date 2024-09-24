import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Asegúrate de importar toast

const TransferForm = ({ onTransferSuccess }) => {
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    amount: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    // Aquí puedes agregar tu lógica de validación
    if (!formData.sourceAccount || !formData.destinationAccount || !formData.amount) {
      return 'Please fill in all fields.';
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
      // Muestra un toast de éxito aquí
      toast.success('Transaction successful: ' + response.data);
      onTransferSuccess(); // Llama a la función que maneja el éxito de la transferencia
    } catch (error) {
      // Aquí se maneja el error proveniente del backend
      setError(error.response?.data || error.message);
      console.error('Error details:', error.response?.data || error.message);
      // Mostrar el toast de error, si es necesario
      toast.error('Error in transaction: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sourceAccount">Source Account</label>
        <input
          type="text"
          id="sourceAccount"
          value={formData.sourceAccount}
          onChange={(e) => setFormData({ ...formData, sourceAccount: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="destinationAccount">Destination Account</label>
        <input
          type="text"
          id="destinationAccount"
          value={formData.destinationAccount}
          onChange={(e) => setFormData({ ...formData, destinationAccount: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Transfer'}
      </button>
    </form>
  );
};

export default TransferForm;
