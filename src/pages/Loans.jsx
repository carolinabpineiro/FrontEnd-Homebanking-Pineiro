import React from 'react';
import LoanForm from '../components/LoanForm';

function Loans() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
   
    <h1 className="text-3xl font-bold mt-8 text-center text-green-800 mb-16">Apply for a loan</h1>
   
<LoanForm/>   
    </div>
  );
}

export default Loans;
