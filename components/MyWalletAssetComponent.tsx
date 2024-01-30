import { useAssets } from "@meshsdk/react";

export default function MyWalletAssetComponent() {
  const assets = useAssets();

  return (
    <div>
      <h2 className="text-2xl font-bold py-5">This is my assets component!</h2>
      <pre>{JSON.stringify(assets, null, 2)}</pre>
    </div>
  );
}
