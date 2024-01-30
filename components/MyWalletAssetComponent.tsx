import { useAssets } from "@meshsdk/react";

export default function MyWalletAssetComponent() {
  const assets = useAssets();

  return (
    <div>
      <h2>This is my assets component!</h2>
      <pre>{JSON.stringify(assets, null, 2)}</pre>
    </div>
  );
}
