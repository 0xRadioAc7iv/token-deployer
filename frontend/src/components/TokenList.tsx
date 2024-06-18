import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenList = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([]);

  const displayProcess = processes?.map((process) => {
    return (
      <div key={process} className="p-2">
        <button
          onClick={() => checkToken(process)}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          {process}
        </button>
      </div>
    );
  });

  const checkToken = (process: string) => {
    navigate(`/token/${process}`);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const signer = createDataItemSigner(window.arweaveWallet);

        const msg = await message({
          process: "byU9XxUliRVDy1lxaZ1zX0GNDa56zV8rU2dm3jd9DiA",
          signer,
          tags: [{ name: "Action", value: "Get-Token-Processes" }],
        });

        const { Messages } = await result({
          message: msg,
          process: "byU9XxUliRVDy1lxaZ1zX0GNDa56zV8rU2dm3jd9DiA",
        });

        setProcesses(JSON.parse(Messages[0].Data));
      } catch (error) {
        alert(`There was an error: ${error}`);
      }
    };

    getMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token Processes</h1>
      <div className="grid grid-cols-1 gap-4">{displayProcess}</div>
    </div>
  );
};

export default TokenList;
