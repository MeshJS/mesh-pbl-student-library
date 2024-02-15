import { CardanoWallet, useWallet } from "@meshsdk/react";
import MintingNativeScript from "./native-script";
import MintingPlutusScript from "./plutus-script";

export default function Minting() {
  const { connected } = useWallet();

  return (
    <main>
      {connected ? (
        <>
          <MintingNativeScript />
          <MintingPlutusScript />
        </>
      ) : (
        <CardanoWallet />
      )}
    </main>
  );
}
