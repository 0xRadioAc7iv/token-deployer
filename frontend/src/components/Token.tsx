import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Token = () => {
  const { process } = useParams();

  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [denomination, setDenomination] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const getBalances = async () => {
    if (!process) {
      toast.error("Process ID is missing");
      return;
    }
    try {
      const signer = createDataItemSigner(window.arweaveWallet);
      const msg = await message({
        process,
        signer,
        tags: [{ name: "Action", value: "Balances" }],
      });
      const { Messages } = await result({
        message: msg,
        process,
      });
      const balances = JSON.parse(Messages[0].Data);
      console.log(balances);
      toast.success("Balances fetched successfully");
    } catch (error) {
      toast.error(`Error fetching balances: ${error}`);
    }
  };

  const mintNewTokens = async () => {
    if (!process || !mintAmount) {
      toast.error("Process ID or Mint Amount is missing");
      return;
    }
    try {
      const signer = createDataItemSigner(window.arweaveWallet);
      const msg = await message({
        process,
        signer,
        tags: [
          { name: "Action", value: "Mint" },
          { name: "Quantity", value: mintAmount },
        ],
      });
      const { Messages } = await result({
        message: msg,
        process,
      });
      console.log(Messages);
      toast.success("Tokens minted successfully");
    } catch (error) {
      toast.error(`Error minting tokens: ${error}`);
    }
  };

  const transferTokens = async () => {
    if (!process || !recipient || !transferAmount) {
      toast.error("Process ID, Recipient, or Transfer Amount is missing");
      return;
    }
    try {
      const signer = createDataItemSigner(window.arweaveWallet);
      const msg = await message({
        process,
        signer,
        tags: [
          { name: "Action", value: "Transfer" },
          { name: "Recipient", value: recipient },
          { name: "Quantity", value: transferAmount },
        ],
      });
      const { Messages } = await result({
        message: msg,
        process,
      });
      console.log(Messages);
      toast.success("Tokens transferred successfully");
    } catch (error) {
      toast.error(`Error transferring tokens: ${error}`);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      if (!process) {
        toast.error("Process ID is missing");
        return;
      }
      try {
        const signer = createDataItemSigner(window.arweaveWallet);
        const msg = await message({
          process,
          signer,
          tags: [{ name: "Action", value: "Info" }],
        });
        const { Messages } = await result({
          message: msg,
          process,
        });
        console.log(Messages);
        setTicker(Messages[0].Tags[6].value);
        setName(Messages[0].Tags[7].value);
        setLogo(Messages[0].Tags[8].value);
        setDenomination(Messages[0].Tags[9].value);
      } catch (error) {
        toast.error(`Error fetching token info: ${error}`);
      }
    };

    getInfo();
  }, [process]);

  return (
    <div className="min-h-screen justify-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 p-4 flex flex-col items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Token Details
        </h2>
        <div className="mb-4 overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 font-bold text-gray-700">
                  Process ID:
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {process}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 font-bold text-gray-700">
                  Ticker:
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{ticker}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 font-bold text-gray-700">
                  Name:
                </td>
                <td className="px-4 py-2 border-b border-gray-200">{name}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 font-bold text-gray-700">
                  Logo:
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <img src={logo} alt="Logo" className="inline-block w-6 h-6" />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200 font-bold text-gray-700">
                  Denomination:
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {denomination}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4 flex justify-center">
          <button
            onClick={getBalances}
            className="w-1/2 flex justify-center bg-black text-white py-2 rounded hover:bg-black/80 transition-colors"
          >
            Get Token Owners
          </button>
        </div>
        <div className="w-full h-[1px] bg-black" />
        <div className="my-4 flex justify-center flex-col items-center gap-y-4">
          <input
            type="text"
            name="mintAmount"
            placeholder="Mint Amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={mintNewTokens}
            className="w-1/2 flex justify-center bg-black text-white py-2 rounded hover:bg-black/80 transition-colors"
          >
            Mint
          </button>
        </div>
        <div className="w-full h-[1px] bg-black" />

        <div className="my-4">
          <input
            type="text"
            name="recipient"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="transferAmount"
            placeholder="Transfer Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={transferTokens}
              className="w-1/2 bg-black text-white py-2 rounded hover:bg-black/80 transition-colors"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Token;
