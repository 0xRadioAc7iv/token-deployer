import { ConnectButton } from "arweave-wallet-kit";

const Navbar = () => {

  return (
    <div className="flex justify-between px-8 py-4 border-b-[1px] border-[#404536]">
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
            Token Deployer
        </a>
      </div>
      <div className="flex justify-center items-center gap-6">
        <ConnectButton
          accent="black"
          profileModal={true}
          showBalance={false}
        >
          Connect Wallet
        </ConnectButton>
      </div>
    </div>
  );
};

export default Navbar;
