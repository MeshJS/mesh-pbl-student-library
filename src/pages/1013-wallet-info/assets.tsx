import Head from "next/head";
import AssetList from "./AssetList";

export default function AssetPage() {
  return (
    <div className="">
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
        <link rel="icon" href="https://meshjs.dev/favicon/favicon-32x32.png" />
      </Head>

      <main className="">
        <h1 className="">
          <a href="https://meshjs.dev/">Mesh</a> PBL
        </h1>

        <div className="">
          <AssetList />
        </div>
      </main>
    </div>
  );
}
