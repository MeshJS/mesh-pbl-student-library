import { Data, Transaction, resolveDataHash, resolveTxHash } from "@meshsdk/core";
import { useAddress, useWallet } from "@meshsdk/react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function TransactionHashExample() {
  const { wallet, connected } = useWallet();
  const address = useAddress();
  const [dataHash, setDataHash] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const getTxHash = async () => {
    if (!connected) return;
    const datum: Data = "usefuldatumfortransaction";
    const dataHash = resolveDataHash(datum);
    setDataHash(dataHash);
    const tx = new Transaction({ initiator: wallet });
    tx.sendLovelace({ address, datum: { value: dataHash } }, "1500000");
    const unsignedTx = await tx.build();
    const txHash = resolveTxHash(unsignedTx);
    setTxHash(txHash);
  };

  return (
    <Card className="border-black p-5 my-5">
      <h2 className="text-2xl font-bold">Transaction</h2>
      {!connected ? (
        <p>
          The wallet is <span className="text-red-500 font-bold">disconnected</span> at home-page
        </p>
      ) : (
        <p>
          The wallet is <span className="text-green-500 font-bold">connected</span> at home-page
        </p>
      )}
      <button onClick={getTxHash} className="bg-blue-500 text-white p-2 rounded-md">
        {connected ? "Get Tx Hash" : "Connect wallet first"}
      </button>
      <p>
        Data Hash: <span className="font-bold">{dataHash}</span>
      </p>
      <p>
        Tx Hash: <span className="font-bold">{txHash}</span>
      </p>
    </Card>
  );
}
