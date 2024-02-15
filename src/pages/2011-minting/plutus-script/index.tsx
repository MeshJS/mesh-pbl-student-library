import { useWallet } from "@meshsdk/react";
import { useState } from "react";

import plutusScript from "./contract/plutus.json";
import cbor from "cbor";
import { type PlutusScript, Transaction, Mint } from "@meshsdk/core";
import { assetMetadata } from "@/components/mesh/asset-metadata";
import Button from "@/components/ui/button";

export default function MintingPlutusScript() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function mint() {
    setLoading(true);

    const address = (await wallet.getUsedAddresses())[0];

    const script: PlutusScript = {
      code: cbor
        .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
        .toString("hex"),
      version: "V2",
    };

    const redeemer = {
      data: { alternative: 0, fields: ["mesh"] },
      tag: "MINT",
    };

    const asset: Mint = {
      assetName: "MeshToken",
      assetQuantity: "1",
      metadata: assetMetadata,
      label: "721",
      recipient: address,
    };

    const tx = new Transaction({ initiator: wallet })
      .mintAsset(script, asset, redeemer)
      .setRequiredSigners([address]);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);

    setLoading(false);
    setSuccess(true);
  }

  return (
    <Button
      onClick={() => mint()}
      disabled={loading}
      color={loading ? "orange" : success ? "green" : "white"}
    >
      Mint with Plutus Script
    </Button>
  );
}
