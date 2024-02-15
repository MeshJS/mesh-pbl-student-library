import { Asset } from "@meshsdk/core";
import { useAssets } from "@meshsdk/react";

export default function AssetList() {
  const assets = useAssets();

  return (
    <div>
      <h2 className="text-2xl font-bold py-5">This is my assets component!</h2>
      {/* View Raw Data */}
      {/* <pre>{JSON.stringify(assets, null, 2)}</pre> */}

      {/* Basic Grid View of Data */}
      <div className="grid grid-cols-4 gap-1">
        {assets &&
          assets.map((asset: Asset, index) => (
            <div key={index} className="bg-white text-black p-5">
              <p>{asset.unit}</p>
              <p>{asset.quantity}</p>
            </div>
          ))}
      </div>

      {/* Mesh PBL Assignment 101: Build an App Component */}
      {/* Idea 1: Improve upon the grid view shown above: https://tailwindcss.com/docs/display#grid */}
      {/* Idea 2: Make a table: https://tailwindcss.com/docs/table-layout */}
      {/* Or, explore your own ideas! */}
    </div>
  );
}
