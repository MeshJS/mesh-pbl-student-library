import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CardanoWallet, MeshBadge, MeshProvider } from "@meshsdk/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col bg-slate-900 text-white min-h-screen">
      <MeshProvider>
        <div className="w-5/6 mx-auto my-10">
          <div className="flex justify-end">
            <CardanoWallet />
          </div>
          <div className="p-5 border border-white rounded-md">
            <Component {...pageProps} />
          </div>
        </div>
        <footer className="flex justify-center py-10">
          <MeshBadge dark={true} />
        </footer>
      </MeshProvider>
    </div>
  );
}
