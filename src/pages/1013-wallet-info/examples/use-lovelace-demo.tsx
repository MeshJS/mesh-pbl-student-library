import { CardanoWallet, useLovelace } from "@meshsdk/react";

export default function UseLovelaceDemoPage() {
  const lovelace = useLovelace();

  return (
    <div>
      <CardanoWallet />
      <pre>{JSON.stringify(lovelace, null, 2)}</pre>
      <p>{lovelace ? `Wallet has ${parseInt(lovelace) / 1000000} ada` : "wallet is not connected"}</p>
    </div>
  );
}
