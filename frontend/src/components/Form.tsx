import {
  connect,
  createDataItemSigner,
  message,
  result,
} from "@permaweb/aoconnect";
import React, { useState } from "react";
import tokenContract from "../utils/token";
import { AOModule, AOScheduler } from "../utils/constants";
import { useActiveAddress } from "arweave-wallet-kit";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "Points Coin",
    ticker: "PNTS",
    logo: "https://image.url",
    denomination: 12,
    initialBalance: 10000,
  });

  const address = useActiveAddress();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function spawnProcess() {
    const ao = connect();

    const result = await ao.spawn({
      module: AOModule,
      scheduler: AOScheduler,
      signer: createDataItemSigner(window.arweaveWallet),
    });

    return result;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet to deploy your token!");
      return;
    }

    const process = await spawnProcess();

    // To add some delay (so that the process is found on the gateway)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      const signer = createDataItemSigner(window.arweaveWallet);

      const msg = await message({
        process: process,
        data: tokenContract(
          formState.initialBalance,
          formState.name,
          formState.ticker,
          formState.denomination,
          formState.logo,
          address
        ),
        signer,
        tags: [{ name: "Action", value: "Eval" }],
      });

      const { Output } = await result({
        message: msg,
        process: process,
      });

      if (Output !== undefined) {
        alert(`Your Token's Process ID: ${process}`);

        await message({
          process: "byU9XxUliRVDy1lxaZ1zX0GNDa56zV8rU2dm3jd9DiA",
          signer,
          tags: [
            { name: "Action", value: "Update" },
            { name: "Process", value: process },
          ],
        });
      } else {
        alert("Could not Deploy your Token! Please try again.");
      }
    } catch (error) {
      alert(`There was an error: ${error}`);
    }
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
            required
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
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Logo (Image URL)</label>
          <input
            type="text"
            name="logo"
            value={formState.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
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
            required
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
            required
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
