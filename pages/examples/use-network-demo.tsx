import { CardanoWallet, useNetwork } from "@meshsdk/react";

export default function UseNetworkDemoPage() {
  const network = useNetwork();

  return (
    <div>
      <CardanoWallet />
      <pre>{JSON.stringify(network, null, 2)}</pre>
      {network == 0 && "connected to a Cardano Testnet"}
      {network == 1 && "connected to Cardano Mainnet"}
    </div>
  );
}
