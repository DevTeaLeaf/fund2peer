import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DEX from "./pages/DEX";
import Assets from "./pages/Assets";
import P2P from "./pages/P2P";
import Launchpad from "./pages/Launchpad";
import FAQ from "./pages/FAQ";

import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { useWeb3ModalTheme } from "@web3modal/react";

import { projectId } from "./web3/constants";

import { wagmiClient, ethereumClient } from "./web3/connector";

const App = () => {
  const { setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "dark",
  });
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/dex" element={<DEX />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/p2p" element={<P2P />} />
          <Route path="/launchpad" element={<Launchpad />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

export default App;
