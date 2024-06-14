import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ArweaveWalletKit } from "arweave-wallet-kit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ArweaveWalletKit
        config={{
          permissions: [
            "SIGN_TRANSACTION",
            "ACCESS_ADDRESS",
            "ACCESS_PUBLIC_KEY",
          ],
          ensurePermissions: true,
        }}
        theme={{
          accent: { r: 255, g: 145, b: 48 },
          displayTheme: "dark",
        }}
      >
        <App />
      </ArweaveWalletKit>{" "}
  </React.StrictMode>,
);
