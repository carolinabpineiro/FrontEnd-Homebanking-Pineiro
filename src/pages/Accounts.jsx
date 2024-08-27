import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import Carousel from '../components/Carousel';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';

// IDs de cuentas de Melva 
const malvaAccountsIds = [1, 2];

const Accounts = () => {
  // Estado para almacenar las cuentas recuperadas de la API
  const [accounts, setAccounts] = useState([]);

  // Estado para indicar si la carga de datos está en curso
  const [loading, setLoading] = useState(true);

  // Estado para almacenar cualquier error que ocurra durante la petición
  const [error, setError] = useState(null);

  // Efecto secundario para recuperar las cuentas al montar el componente
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Realizar la petición GET a la API
        const response = await axios.get('http://localhost:8080/api/accounts');

        // Filtrar las cuentas que pertenecen a Melva
        const filteredAccounts = response.data.filter(account => malvaAccountsIds.includes(account.id));

        // Actualizar el estado con las cuentas filtradas
        setAccounts(filteredAccounts);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Error fetching accounts'); // Mensaje de error para el usuario
      } finally {
        // Marcar la carga como finalizada independientemente del resultado
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Mostrar mensaje de carga mientras se recuperan los datos
  if (loading) return <p>Loading...</p>;

  // Mostrar mensaje de error si ocurrió un problema durante la petición
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-4xl text-green-800 font-bold text-center py-8">Welcome, Thomas!</h1>
      <Carousel />  {/* Renderizar el componente Carousel */}
      <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
        <div className="py-4">
          <CustomButton text="Request Account" />  {/* Botón para solicitar cuenta */}
        </div>
        <div className="flex space-x-4">
          {/* Recorrer las cuentas y renderizar un Card para cada una */}
          {accounts.map(account => (
            <Link key={account.id} to={`/account/${account.id}`} className="flex-none">
              <Card
                accountNumber={account.number}
                amount={account.balance}
                creationDate={account.creationDate}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;