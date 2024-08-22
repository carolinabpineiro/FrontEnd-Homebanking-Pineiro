import React, { useState } from 'react';

function TransferForm() {
  const [destinationType, setDestinationType] = useState('');
  const [sourceAccount, setSourceAccount] = useState('account1');
  const [destinationAccount, setDestinationAccount] = useState('');

  const handleDestinationChange = (event) => {
    setDestinationType(event.target.value);
    setDestinationAccount('');
  };

  return (
    <div className="bg-green-400 shadow-lg rounded-lg w-4/5 h-4/5 flex justify-center items-center mx-auto">
      <div className="w-full h-full flex">
        
        {/* Mitad Izquierda */}
        <div className="w-2/5 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3">Destination Type</h2>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="destinationType"
                value="own"
                className="form-radio"
                checked={destinationType === 'own'}
                onChange={handleDestinationChange}
              />
              <span className="ml-2">Own</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="destinationType"
                value="others"
                className="form-radio"
                checked={destinationType === 'others'}
                onChange={handleDestinationChange}
              />
              <span className="ml-2">Others</span>
            </label>
          </div>

          <h2 className="text-xl font-semibold mb-3">Source Account</h2>
          <select
            className="w-full p-3 mb-6 border border-gray-300 rounded-md"
            value={sourceAccount}
            onChange={(e) => setSourceAccount(e.target.value)}
          >
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
          </select>

          {destinationType && (
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-semibold mb-3">Destination Account</h2>
              <span className="mx-3 text-3xl">→</span>
              <select
                className="w-full p-3 border border-gray-300 rounded-md"
                value={destinationAccount}
                onChange={(e) => setDestinationAccount(e.target.value)}
              >
                {destinationType === 'own' ? (
                  <>
                    <option value="account1">Account 1</option>
                    <option value="account2">Account 2</option>
                  </>
                ) : (
                  <>
                    <option value="externalAccount1">External Account 1</option>
                    <option value="externalAccount2">External Account 2</option>
                  </>
                )}
              </select>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-3">Amount</h2>
          <input 
            type="text" 
            placeholder="Enter Amount" 
            className="w-full p-3 mb-6 border border-gray-300 rounded-md"
          />

          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <input 
            type="text" 
            placeholder="Enter Description" 
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Mitad Derecha */}
        <div className="w-3/5 flex justify-center items-center">
          <img 
            src="/transfer.jpg" 
            alt="Transaction Illustration" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
}

export default TransferForm;
