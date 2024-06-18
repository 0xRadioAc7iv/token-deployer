import { createDataItemSigner, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    if (process) {
      const signer = createDataItemSigner(window.arweaveWallet);

      const msg = await message({
        process: process,
        signer,
        tags: [{ name: "Action", value: "Balances" }],
      });

      const { Messages } = await result({
        message: msg,
        process: process,
      });

      const balances = JSON.parse(Messages[0].Data);
      console.log(balances);
    }
  };

  const mintNewTokens = async () => {
    try {
      if (process && mintAmount) {
        const signer = createDataItemSigner(window.arweaveWallet);

        const msg = await message({
          process: process,
          signer,
          tags: [
            { name: "Action", value: "Mint" },
            { name: "Quantity", value: mintAmount },
          ],
        });

        const { Messages } = await result({
          message: msg,
          process: process,
        });

        console.log(Messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transferTokens = async () => {
    try {
      if (process && recipient && transferAmount) {
        const signer = createDataItemSigner(window.arweaveWallet);

        const msg = await message({
          process: process,
          signer,
          tags: [
            { name: "Action", value: "Transfer" },
            { name: "Recipient", value: recipient },
            { name: "Quantity", value: transferAmount },
          ],
        });

        const { Messages } = await result({
          message: msg,
          process: process,
        });

        console.log(Messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        if (process) {
          const signer = createDataItemSigner(window.arweaveWallet);

          const msg = await message({
            process: process,
            signer,
            tags: [{ name: "Action", value: "Info" }],
          });

          const { Messages } = await result({
            message: msg,
            process: process,
          });

          console.log(Messages);

          setTicker(Messages[0].Tags[6].value);
          setName(Messages[0].Tags[7].value);
          setLogo(Messages[0].Tags[8].value);
          setDenomination(Messages[0].Tags[9].value);
        }
      } catch (error) {
        alert(`There was an error: ${error}`);
      }
    };

    getInfo();
  }, [process]);

  return (
    <div>
      <div>
        <p>{process}</p>
        <p>{ticker}</p>
        <p>{name}</p>
        <p>{logo}</p>
        <p>{denomination}</p>
      </div>
      <div>
        <button onClick={() => getBalances()}>Get Token Owners</button>
      </div>
      <div>
        <input
          type="text"
          name="mintAmount"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        ></input>
        <button onClick={() => mintNewTokens()}>Mint</button>
      </div>
      <div>
        <input
          type="text"
          name="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        ></input>
        <input
          type="text"
          name="transferAmount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        ></input>
        <button onClick={() => transferTokens()}>Transfer</button>
      </div>
    </div>
  );
};

export default Token;
