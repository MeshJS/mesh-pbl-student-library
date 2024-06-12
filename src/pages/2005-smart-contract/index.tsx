import { CardanoWallet, useWallet } from "@meshsdk/react";
import ButtonDemo from "@/components/ButtonDemo";
import {
  PlutusScript,
  Transaction,
  resolvePlutusScriptAddress,
  BlockfrostProvider,
  resolvePaymentKeyHash,
  Data,
  resolveDataHash,
} from "@meshsdk/core";
import { useState } from "react";
import plutusScript from "./plutus.json";
import cbor from "cbor";

const script: PlutusScript = {
  code: cbor
    .encode(Buffer.from(plutusScript.validators[0].compiledCode, "hex"))
    .toString("hex"),
  version: "V2",
};
const scriptAddress = resolvePlutusScriptAddress(script, 0);
const redeemerData = "Hello, World!";
const lovelaceAmount = "3000000";

const blockfrost_api_key = "";

const blockchainProvider = new BlockfrostProvider(
  process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD || blockfrost_api_key
);

enum States {
  init,
  locking,
  lockingConfirming,
  locked,
  unlocking,
  unlockingConfirming,
  unlocked,
}

export default function Page() {
  const { connected } = useWallet();

  return (
    <div className="flex gap-4">
      {connected ? (
        <>
          <Demo />
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}

function Demo() {
  const { wallet, connected } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [state, setState] = useState(States.init);

  async function lockAiken() {
    setState(States.locking);
    setLoading(true);

    const hash = resolvePaymentKeyHash((await wallet.getUsedAddresses())[0]);
    const datum: Data = {
      alternative: 0,
      fields: [hash],
    };

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      {
        address: scriptAddress,
        datum: { value: datum },
      },
      lovelaceAmount
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);
    setLoading(false);
    
    if (txHash) {
      setState(States.lockingConfirming);
      blockchainProvider.onTxConfirmed(
        txHash,
        () => {
          setState(States.locked);
        },
        100
      );
    }
  }

  async function _getAssetUtxo({
    scriptAddress,
    asset,
    datum,
  }: {
    scriptAddress: string;
    asset: string;
    datum: Data;
  }) {
    const utxos = await blockchainProvider.fetchAddressUTxOs(
      scriptAddress,
      asset
    );

    const dataHash = resolveDataHash(datum);

    let utxo = utxos.find((utxo: any) => {
      return utxo.output.dataHash == dataHash;
    });

    return utxo;
  }

  async function unlockAiken() {
    setLoading(true);
    setState(States.unlocking);
    
    const scriptAddress = resolvePlutusScriptAddress(script, 0);

    const address = (await wallet.getUsedAddresses())[0];
    const hash = resolvePaymentKeyHash(address);
    const datum: Data = {
      alternative: 0,
      fields: [hash],
    };

    const assetUtxo = await _getAssetUtxo({
      scriptAddress: scriptAddress,
      asset: "lovelace",
      datum: datum,
    });
    console.log("assetUtxo", assetUtxo);

    const redeemer = { data: { alternative: 0, fields: [redeemerData] } };

    // create the unlock asset transaction
    const tx = new Transaction({ initiator: wallet })
      .redeemValue({
        value: assetUtxo,
        script: script,
        datum: datum,
        redeemer: redeemer,
      })
      .sendValue(address, assetUtxo)
      .setRequiredSigners([address]);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);
    setLoading(false);

    if (txHash) {
      setState(States.unlockingConfirming);
      blockchainProvider.onTxConfirmed(txHash, () => {
        setState(States.unlocked);
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      State: {States[state]}
      <div className="flex gap-4">
        <ButtonDemo
          fn={() => lockAiken()}
          label="Lock assets"
          loading={loading}
          success={success}
        />
        <ButtonDemo
          fn={() => unlockAiken()}
          label="Redeem assets"
          loading={loading}
          success={success}
        />
      </div>
    </div>
  );
}
