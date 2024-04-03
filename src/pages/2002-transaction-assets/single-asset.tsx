import ButtonDemo from "@/components/ButtonDemo";
import { Transaction } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export default function SingleAsset() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function demo() {
    setLoading(true);

    const tx = new Transaction({ initiator: wallet }).sendAssets(
      "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
      [
        {
          unit: "64af286e2ad0df4de2e7de15f8ff5b3d27faecf4ab2757056d860a424d657368546f6b656e",
          quantity: "1",
        },
      ]
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
      label="Send one asset"
      loading={loading}
      success={success}
    />
  );
}
