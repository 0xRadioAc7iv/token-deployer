import React, { useState } from "react";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "Points Coin",
    ticker: "PNTS",
    logo: "SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY",
    denomination: 12,
    initialBalance: 10000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission and deploy the contract
    console.log(formState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[800px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Deploy Token Contract
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ticker</label>
          <input
            type="text"
            name="ticker"
            value={formState.ticker}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Logo</label>
          <input
            type="text"
            name="logo"
            value={formState.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Denomination</label>
          <input
            type="number"
            name="denomination"
            value={formState.denomination}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Initial Balance</label>
          <input
            type="number"
            name="initialBalance"
            value={formState.initialBalance}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-32 bg-black text-white py-2 rounded hover:bg-black/80 hover:scale-95 transition"
          >
            <div>Deploy</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;