import { ConnectButton } from "arweave-wallet-kit";

const Navbar = () => {

  return (
    <div className="flex justify-between bg-transparent px-8 py-4">
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
