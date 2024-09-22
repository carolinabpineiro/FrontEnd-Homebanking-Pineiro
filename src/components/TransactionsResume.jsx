import React from 'react';

const TransactionsResume = ({ transactions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Transactions Resume</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left text-gray-600">Type</th>
            <th className="py-2 px-4 text-left text-gray-600">Amount</th>
            <th className="py-2 px-4 text-left text-gray-600">Date</th>
            <th className="py-2 px-4 text-left text-gray-600">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            // Ajustar colores: CREDIT en verde, DEBIT en rojo
            const typeClass = transaction.transactionType === 'CREDIT' ? 'text-green-600' : 'text-red-600';

            // Formateo de la fecha y hora
            const formattedDate = new Date(transaction.dateTransaction).toLocaleString('es-AR', {
              dateStyle: 'short',
              timeStyle: 'short',
            });

            return (
              <tr key={index} className="border-b border-gray-200">
                {/* Tipo de transacción con color */}
                <td className={`py-2 px-4 ${typeClass}`}>{transaction.transactionType}</td>

                {/* Monto con formato monetario */}
                <td className={`py-2 px-4 ${typeClass}`}>
                  {transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </td>

                {/* Fecha formateada */}
                <td className="py-2 px-4">{formattedDate}</td>

                {/* Descripción de la transacción */}
                <td className="py-2 px-4">{transaction.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsResume;