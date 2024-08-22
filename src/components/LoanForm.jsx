import React from 'react';

function LoanForm() {
    return (
        <div className="flex justify-center h-screen">
            <div className="bg-green-400 shadow-lg rounded-lg w-[90%] h-3/4 flex">

                {/* Mitad Izquierda */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-4">Select Loan:</h2>
                    <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
                        <option value="account1">Loan 1</option>
                        <option value="account2">Loan 2</option>
                    </select>

                    <h2 className="text-xl font-semibold mb-4">Source Account:</h2>
                    <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
                        <option value="account1">Account 1</option>
                        <option value="account2">Account 2</option>
                    </select>

                    <h2 className="text-xl font-semibold mb-4">Amount:</h2>
                    <input
                        type="text"
                        placeholder="Enter Amount"
                        className="w-full p-2 mb-6 border border-gray-300 rounded-md"
                    />

                    <h2 className="text-xl font-semibold mb-4">Payment:</h2>
                    <select className="w-full p-2 mb-6 border border-gray-300 rounded-md">
                        <option value="account1">3</option>
                        <option value="account2">6</option>
                        <option value="account2">12</option>
                        <option value="account2">24</option>
                    </select>
                </div>

                {/* Mitad Derecha */}
                <div className="w-1/2 flex justify-center items-center">
                    <img
                        src="/loans.jpg"
                        alt="Transaction Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default LoanForm;