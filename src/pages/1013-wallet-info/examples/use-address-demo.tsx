import { CardanoWallet, useAddress } from "@meshsdk/react";

export default function UseAddressDemoPage() {
  const address = useAddress();

  return (
    <div>
      <CardanoWallet />
      <pre>{JSON.stringify(address, null, 2)}</pre>
      <p>{address ? `Connected with address: ${address}`: "wallet is not connected"}</p>
    </div>
  );
}
