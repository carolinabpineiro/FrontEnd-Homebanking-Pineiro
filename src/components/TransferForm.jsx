import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'; // Usamos react-spinners para el loader

const TransferForm = () => {
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    amount: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para manejar el loader

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validaciones antes de hacer la solicitud
  const validateForm = () => {
    if (!formData.sourceAccount || !formData.destinationAccount) {
      return 'Las cuentas de origen y destino son obligatorias.';
    }
    if (formData.sourceAccount === formData.destinationAccount) {
      return 'La cuenta de origen y destino no pueden ser la misma.';
    }
    if (parseFloat(formData.amount) <= 0 || isNaN(parseFloat(formData.amount))) {
      return 'El monto debe ser un número positivo.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar el formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true); // Mostrar el loader al empezar
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
      toast.success('Transacción exitosa');
    } catch (error) {
      setError(error.response?.data || error.message);
      console.error('Error details:', error.response?.data || error.message);
      toast.error('Error en la transacción');
    } finally {
      setLoading(false); // Ocultar el loader al finalizar
    }
  };

  return (
    <div className="bg-green-700 opacity-90 p-10 rounded-lg shadow-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Transferencia Bancaria</h2>

        {/* Cuenta de Origen */}
        <div className="mb-4">
          <label htmlFor="sourceAccount" className="block text-sm font-medium text-white">
            Cuenta de Origen:
          </label>
          <input
            type="text"
            id="sourceAccount"
            name="sourceAccount"
            value={formData.sourceAccount}
            onChange={handleInputChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Cuenta de Destino */}
        <div className="mb-4">
          <label htmlFor="destinationAccount" className="block text-sm font-medium text-white">
            Cuenta de Destino:
          </label>
          <input
            type="text"
            id="destinationAccount"
            name="destinationAccount"
            value={formData.destinationAccount}
            onChange={handleInputChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Monto */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-white">
            Monto:
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

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Descripción:
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

        {/* Botón de enviar con loader */}
        <button
          type="submit"
          className={`w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? 'cursor-not-allowed opacity-70' : ''
          }`}
          disabled={loading} // Deshabilitar el botón cuando esté cargando
        >
          {loading ? <ClipLoader size={20} color={"#ffffff"} /> : "Enviar Transferencia"}
        </button>

        {/* Mensaje de error */}
        {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      </form>
    </div>
  );
};

export default TransferForm;