import { CardanoWallet, useWallet } from "@meshsdk/react";
import SingleAddress from "./single-address";
import MultiAddresses from "./multi-addresses";

export default function Page() {
  const { connected } = useWallet();

  return (
    <div className="flex gap-4">
      {connected ? (
        <>
          <SingleAddress />
          <MultiAddresses />
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}
