import { useState } from "react";
import ButtonDemo from "@/components/ButtonDemo";
import { Transaction, MeshWallet, BlockfrostProvider } from "@meshsdk/core";

export default function SendLovelace() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const blockfrost_api_key = "";

  async function demo() {
    setLoading(true);

    const blockchainProvider = new BlockfrostProvider(
      process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD || blockfrost_api_key
    );

    const wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: [
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
        ],
      },
    });

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
      "1000000"
    );
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);

    setLoading(false);
    setSuccess(true);
  }

  return (
    <ButtonDemo
      fn={() => demo()}
      label="Send to one address"
      loading={loading}
      success={success}
    />
  );
}
