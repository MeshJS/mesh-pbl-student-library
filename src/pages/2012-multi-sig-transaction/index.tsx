import { useState } from "react";
import type { NextPage } from "next";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import {
  AppWallet,
  ForgeScript,
  largestFirst,
  KoiosProvider,
  UTxO,
  Mint,
  Transaction,
} from "@meshsdk/core";
import { assetMetadata } from "@/components/mesh/asset-metadata";
import { walletMnemonic } from "@/components/mesh/wallet-mnemonic";
import Button from "@/components/ui/button";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Mint Mesh Token</h1>
        {connected ? <MintSection /> : <CardanoWallet />}
      </div>
    </div>
  );
};

export default Home;

function MintSection() {
  const koiosProvider = new KoiosProvider("preprod");

  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);

  async function startMinting() {
    setSuccess(false);
    setTxHash(undefined);
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();
    console.log("starting minting", { recipientAddress, utxos });
    const { unsignedTx } = await createTransaction(recipientAddress, utxos);

    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log({ txHash });
    setLoading(false);
    setTxHash(txHash);

    koiosProvider.onTxConfirmed(
      txHash,
      () => {
        console.log("Transaction confirmed");
        setSuccess(true);
      },
      100
    );
  }

  return (
    <>
      {txHash ? (
        <>
          <p>
            <b>Tx Hash:</b>
            <br />
            {txHash}
          </p>
          {success ? (
            <p>Transaction confirmed</p>
          ) : (
            <p>Waiting confirmation...</p>
          )}
        </>
      ) : (
        <Button
          onClick={() => startMinting()}
          disabled={loading}
          color={loading ? "orange" : success ? "green" : "white"}
        >
          Mint Token
        </Button>
      )}
    </>
  );
}

async function createTransaction(recipientAddress: string, utxos: UTxO[]) {
  const koiosProvider = new KoiosProvider("preprod");

  const appWallet = new AppWallet({
    networkId: 0,
    fetcher: koiosProvider,
    submitter: koiosProvider,
    key: {
      type: "mnemonic",
      words: walletMnemonic,
    },
  });

  // minting script
  const appWalletAddress = appWallet.getPaymentAddress();
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  // define assets
  const assetName = "MeshToken";

  const asset: Mint = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: assetMetadata,
    label: "721",
    recipient: recipientAddress,
  };

  const costLovelace = "10000000";
  const bankWalletAddress =
    "addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx";

  const selectedUtxos = largestFirst(costLovelace, utxos, true);

  // create the transaction
  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.sendLovelace(bankWalletAddress, costLovelace);
  tx.setChangeAddress(recipientAddress);
  const _unsignedTx = await tx.build();
  const unsignedTx = await appWallet.signTx(_unsignedTx, true);

  return { unsignedTx: unsignedTx };
}
