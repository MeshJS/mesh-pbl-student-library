import { CardanoWallet, useWallet } from "@meshsdk/react";
import SingleAsset from "./single-asset";
import MultiAssets from "./multi-assets";
import StableCoin from "./stable-coin";

export default function Page() {
  const { connected } = useWallet();

  return (
    <div className="flex gap-4">
      {connected ? (
        <>
          <SingleAsset />
          <MultiAssets />
          <StableCoin />
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}
