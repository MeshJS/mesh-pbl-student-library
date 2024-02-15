import { CardanoWallet, useWalletList } from "@meshsdk/react";
import Image from "next/image";

export default function UseWalletListDemoPage() {
  const walletList = useWalletList();

  return (
    <div>
      <CardanoWallet />
      <pre>{JSON.stringify(walletList, null, 2)}</pre>
      <div>
        {walletList.map((item) => (
          <Image key={item.name} src={item.icon} alt={item.name} width={100} height={100} />
        ))}
      </div>
    </div>
  );
}
