import { CardanoWallet, useAssets } from "@meshsdk/react";

export default function UseWalletDemoPage() {
  const assets = useAssets();

  return (
    <div>
      <CardanoWallet />
      {assets ? <pre>{JSON.stringify(assets, null, 2)}</pre> : "Connect a wallet to view assets."}
    </div>
  );
}
