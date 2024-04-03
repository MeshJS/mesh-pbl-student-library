import { CardanoWallet, useWallet } from "@meshsdk/react";
import MintingNativeScript from "./native-script";
import MintingPlutusScript from "./plutus-script";

export default function Page() {
  const { connected } = useWallet();

  return (
    <div className="flex gap-4">
      {connected ? (
        <>
          <MintingNativeScript />
          <MintingPlutusScript />
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}
