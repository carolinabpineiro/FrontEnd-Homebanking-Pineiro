import React from 'react';

const TransactionsResume = () => {
  const transactions = [
    {
      type: 'DEBIT',
      amount: 25000.00,
      date: '2024-08-15T10:30:00',
      transcription: 'Initial deposit'
    },
    {
      type: 'CREDIT',
      amount: 150800.75,
      date: '2024-08-17T15:45:00',
      transcription: 'ATM withdrawal'
    },
    {
      type: 'CREDIT',
      amount: 500000.00,
      date: '2024-08-18T12:00:00',
      transcription: 'Transfer to savings'
    }
    // Puedes agregar más transacciones aquí
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Transactions Resume</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left text-gray-600">Type</th>
            <th className="py-2 px-4 text-left text-gray-600">Amount</th>
            <th className="py-2 px-4 text-left text-gray-600">Date</th>
            <th className="py-2 px-4 text-left text-gray-600">Time</th>
            <th className="py-2 px-4 text-left text-gray-600">Transcription</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const typeClass = transaction.type === 'DEBIT' ? 'text-green-600' : 'text-red-600';
            const amountClass = transaction.type === 'DEBIT' ? 'text-green-600' : 'text-red-600';
            return (
              <tr key={index} className="border-b border-gray-200">
                <td className={`py-2 px-4 ${typeClass}`}>{transaction.type}</td>
                <td className={`py-2 px-4 ${amountClass}`}>
                  {transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </td>
                <td className="py-2 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="py-2 px-4">{new Date(transaction.date).toLocaleTimeString()}</td>
                <td className="py-2 px-4">{transaction.transcription}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsResume;