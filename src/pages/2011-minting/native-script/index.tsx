import { assetMetadata } from "@/components/mesh/asset-metadata";
import Button from "@/components/ui/button";
import {
  type Mint,
  ForgeScript,
  Transaction,
  resolvePaymentKeyHash,
  type NativeScript,
  resolveSlotNo,
} from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useState } from "react";

export default function MintingNativeScript() {
  return (
    <>
      <MintForgeScript />
      <MintNativeScript />
    </>
  );
}

function MintForgeScript() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function mint() {
    setLoading(true);

    // use browser wallet to get address
    const usedAddress = await wallet.getUsedAddresses();
    const address = usedAddress[0];

    // create forgingScript
    const forgingScript = ForgeScript.withOneSignature(address);

    // create transaction
    const tx = new Transaction({ initiator: wallet });

    const asset: Mint = {
      assetName: "MeshToken",
      assetQuantity: "1",
      metadata: assetMetadata,
      label: "721",
      recipient: address,
    };

    tx.mintAsset(forgingScript, asset);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);

    setLoading(false);
    setSuccess(true);
  }

  return (
    <Button
      onClick={() => mint()}
      disabled={loading}
      color={loading ? "orange" : success ? "green" : "white"}
    >
      Mint with One Signature
    </Button>
  );
}

function MintNativeScript() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function mint() {
    setLoading(true);

    // prepare forgingScript
    const usedAddress = await wallet.getUsedAddresses();
    const address = usedAddress[0];

    const keyHash = resolvePaymentKeyHash(address);

    // get slot number of expiry
    let oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const slot = resolveSlotNo("preprod", oneYearFromNow.getTime());

    const nativeScript: NativeScript = {
      type: "all",
      scripts: [
        {
          type: "before",
          slot: slot,
        },
        {
          type: "sig",
          keyHash: keyHash,
        },
      ],
    };

    const forgingScript = ForgeScript.fromNativeScript(nativeScript);

    // create transaction

    const tx = new Transaction({ initiator: wallet });

    const asset: Mint = {
      assetName: "MeshToken",
      assetQuantity: "1",
      metadata: assetMetadata,
      label: "721",
      recipient: address,
    };

    tx.mintAsset(forgingScript, asset);

    tx.setTimeToExpire(slot);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
    setSuccess(true);
  }

  return (
    <>
      <Button
        onClick={() => mint()}
        disabled={loading}
        color={loading ? "orange" : success ? "green" : "white"}
      >
        Mint with Native Script
      </Button>
    </>
  );
}
