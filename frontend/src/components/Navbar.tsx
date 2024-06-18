import { ConnectButton } from "arweave-wallet-kit";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goToTokens = () => {
    navigate("/your-tokens");
  };

  return (
    <div className="flex justify-between bg-transparent px-8 py-4">
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={() => goToTokens()}
          className={`bg-black text-white py-2 px-4 rounded transition-colors duration-200 "hover:bg-gray-900"
            `}
        >
          Your Tokens
        </button>
        <ConnectButton accent="black" profileModal={true} showBalance={false}>
          Connect Wallet
        </ConnectButton>
      </div>
    </div>
  );
};

export default Navbar;
