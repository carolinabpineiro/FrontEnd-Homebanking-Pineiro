import React from 'react';

function LoanForm() {
    return (
      <div className="bg-green-700 opacity-90 p-24 rounded-lg shadow-lg w-1/2">
        {/* Mitad Izquierda */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-white">Select Loan:</h2>
          <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
            <option value="loan1">Loan 1</option>
            <option value="loan2">Loan 2</option>
          </select>
  
          <h2 className="text-xl font-semibold mb-4 text-white">Source Account:</h2>
          <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
          </select>
  
          <h2 className="text-xl font-semibold mb-4 text-white">Amount:</h2>
          <input
            type="text"
            placeholder="Enter Amount"
            className="w-full p-2 mb-6 border border-gray-300 rounded-md"
          />
  
          <h2 className="text-xl font-semibold mb-4 text-white">Payment:</h2>
          <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
          </select>
  
          <button className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
            Apply for Loan
          </button>
        </div>
      </div>
    );
  }
  
  export default LoanForm;