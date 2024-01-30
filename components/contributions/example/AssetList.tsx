import { Asset } from "@meshsdk/core";
import { useAssets } from "@meshsdk/react";

export default function AssetList() {
  const assets = useAssets();

  return (
    <div>
      <h2>This is my assets component!</h2>
      {/* <pre>{JSON.stringify(assets, null, 2)}</pre> */}
      {assets &&
        assets.map((asset: Asset) => (
          <div className="bg-white text-black p-5">
            <p>{asset.assetName}</p>
            <p>{asset.quantity}</p>
          </div>
        ))}
    </div>
  );
}
