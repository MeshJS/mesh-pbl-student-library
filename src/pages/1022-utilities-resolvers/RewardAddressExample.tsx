import { resolveRewardAddress } from "@meshsdk/core";
import { useAddress, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function RewardAddressExample() {
  const { wallet, connected } = useWallet();
  const address = useAddress();
  const [rewardAddress, setRewardAddress] = useState<string>("");

  useEffect(() => {
    if (address) {
      setRewardAddress(resolveRewardAddress(address));
    }
  }, [address]);

  return (
    <Card className="border-black p-5 my-5">
      <h2 className="text-2xl font-bold">Reward Address</h2>
      <p>
        Address:
        <span className="font-bold">{connected ? rewardAddress : "Connect wallet first"}</span>
      </p>
    </Card>
  );
}
