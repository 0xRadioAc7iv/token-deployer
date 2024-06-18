import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenList = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([]);

  const displayProcess = processes?.map((process) => {
    return (
      <button key={process} onClick={() => checkToken(process)}>
        {process}
      </button>
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
    <div className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 h-screen flex justify-center items-center flex-col">
      <h1 className="text-2xl flex justify-center font-bold mb-4">
        Token Processes
      </h1>
      <div className="flex flex-col gap-y-4 border w-1/2 justify-start bg-white rounded-md shadow-md p-4">
        {displayProcess}
      </div>
    </div>
  );
};

export default TokenList;
