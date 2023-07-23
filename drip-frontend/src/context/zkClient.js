import { createContext, useState, useContext } from "react";
import { ethers } from "ethers";
import { createContext, useState } from "react";
import {
  ZkBobClient,
  ProverMode,
  deriveSpendingKeyZkBob,
} from "zkbob-client-js";
import { hexToBuf } from "zkbob-client-js/lib/utils";
import { config } from "../config";

const ZkClientContext = createContext({
  zkClient: undefined,
  login: undefined,
});

function zKBobProvider({ children }) {
  const [zkClient, setZkClient] = useState(undefined);

  async function login() {
    const client = await ZkBobClient.create(config, "BOB-sepolia");
    const mnemonic = ethers.utils.entropyToMnemonic(
      hexToBuf(
        "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
      )
    );
    const accountConfig = {
      sk: deriveSpendingKeyZkBob(mnemonic),
      pool: "BOB-sepolia",
      birthindex: -1,
      proverMode: ProverMode.Local,
    };
    await client.login(accountConfig);

    console.log(
      `Shielded account balance: ${await client.getTotalBalance()} Gwei`
    );
    console.log(client);
    setZkClient(client);
  }

  //   const value = { authZKBob, setAuthZKBob };
  const value = { zkClient, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthZKBob() {
  const context = useContext(ZkClientContext);
  if (context === undefined) {
    throw new Error("useAuthZKBob must be used within a ZKAuthProvider");
  }
  return context;
}

export { AuthZKBobProvider, useAuthZKBob };
