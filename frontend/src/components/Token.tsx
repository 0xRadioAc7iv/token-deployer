import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Modal component
const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xl">
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Token = () => {
  const { process } = useParams();

  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [denomination, setDenomination] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balances, setBalances] = useState<Array<any>>();
  const [displayBalances, setDisplayBalances] = useState<Array<any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
    setDisplayBalances(balances); // Set initial display balances when modal opens
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSearchKey(""); // Clear search input on modal close
  };

  // Effect to update displayBalances when balances change
  useEffect(() => {
    setDisplayBalances(balances);
  }, [balances]);

  // Function to filter balances based on search key
  useEffect(() => {
    if (!searchKey.trim()) {
      setDisplayBalances(balances);
    } else {
      const filteredBalances = balances?.filter((balance) =>
        balance[0].toLowerCase().includes(searchKey.toLowerCase())
      );
      setDisplayBalances(filteredBalances);
    }
  }, [balances, searchKey]);

  // Function to get balances
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
      const balanceObject = JSON.parse(Messages[0].Data);
      const balanceArray = Object.entries(balanceObject);
      setBalances(balanceArray);
      toast.success("Balances fetched successfully");
      openModal(); // Open modal after balances are fetched
    } catch (error) {
      toast.error(`Error fetching balances: ${error}`);
    }
  };

  // Function to mint new tokens
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
      toast.success("Tokens minted successfully");
    } catch (error) {
      toast.error(`Error minting tokens: ${error}`);
    }
  };

  // Function to transfer tokens
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
      toast.success("Tokens transferred successfully");
    } catch (error) {
      toast.error(`Error transferring tokens: ${error}`);
    }
  };

  // Effect to fetch token info on process change
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
        setTicker(Messages[0].Tags[6].value);
        setName(Messages[0].Tags[7].value);
        setDenomination(Messages[0].Tags[8].value);
        setLogo(Messages[0].Tags[9].value);
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
        <div className="mb-4 flex flex-col gap-y-2 items-center justify-center">
          <button
            onClick={getBalances}
            className="w-1/2 flex justify-center bg-black text-white py-2 rounded hover:bg-black/80 transition-colors"
          >
            Get Balances
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
            className="w-full px-3 py-2 mb-2 border            rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Balances</h2>
        <div className="mb-4">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            placeholder="Search by key"
            className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-y-auto max-h-60">
          {displayBalances?.length ? (
            displayBalances.map((balance) => (
              <div key={balance[0]} className="mb-2">
                <p className="font-bold">{balance[0]}</p>
                <p>{balance[1]}</p>
                <div className="w-full h-[1px] bg-gray-200 my-2"></div>
              </div>
            ))
          ) : (
            <p>No balances to display.</p>
          )}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Token;
