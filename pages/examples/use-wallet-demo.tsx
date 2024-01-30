import { CardanoWallet, useWallet } from "@meshsdk/react";

export default function UseWalletDemoPage() {
  const wallet = useWallet();

  return (
    <div>
      <CardanoWallet />
      <pre>{JSON.stringify(wallet, null, 2)}</pre>
      <p>{wallet.connected ? "wallet is connected" : "wallet is not connected"}</p>
    </div>
  );
}
