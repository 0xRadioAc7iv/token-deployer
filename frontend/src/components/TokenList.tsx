import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenList = () => {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState([]);
  const displayProcess = processes?.map((process) => {
    return (
      <div key={process}>
        <button onClick={() => checkToken(process)}>{process}</button>
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

  return <div>{displayProcess}</div>;
};

export default TokenList;
