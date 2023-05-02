import { configureChains, createClient, goerli } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { polygon } from "wagmi/chains";
import { projectId } from "./constants";

const chains = [polygon, goerli];

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
export const ethereumClient = new EthereumClient(wagmiClient, chains);
