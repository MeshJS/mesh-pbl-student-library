import { useWallet } from "@meshsdk/react";

export default function MyWalletComponent() {
  const wallet = useWallet();

  return (
    <div>
      <h2 className="text-2xl font-bold py-5">This is my wallet component!</h2>
      <pre>{JSON.stringify(wallet, null, 2)}</pre>
    </div>
  );
}
