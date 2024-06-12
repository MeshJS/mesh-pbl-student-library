import { CardanoWallet, useWallet } from "@meshsdk/react";
import ButtonDemo from "@/components/ButtonDemo";
import { Transaction } from "@meshsdk/core";
import { useEffect, useState } from "react";

// const poolId = "pool1mhww3q6d7qssj5j2add05r7cyr7znyswe2g6vd23anpx5sh6z8d"; // Mainnet Gimbalabs stake pool
const poolId = "pool107k26e3wrqxwghju2py40ngngx2qcu48ppeg7lk0cm35jl2aenx"; // Preprod Apex Cardano Pool

export default function Page() {
  const { connected } = useWallet();

  return (
    <div className="flex gap-4">
      {connected ? (
        <>
          <Demo />
        </>
      ) : (
        <CardanoWallet />
      )}
    </div>
  );
}

function Demo() {
  const { wallet, connected } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [rewardAddress, setRewardAddress] = useState("");

  useEffect(() => {
    if (connected) {
      wallet?.getRewardAddresses().then((addresses) => {
        setRewardAddress(addresses[0]);
      });
    }
  }, [connected]);

  const registerStake = async () => {
    setLoading(true);
    try {
      const tx = new Transaction({ initiator: wallet });
      tx.registerStake(rewardAddress);
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log("txHash", txHash);
      setSuccess(true);
    } catch (error) {
      console.log("Staking error: ", error);
    }
    setLoading(false);
  };

  const delegateStake = async () => {
    setLoading(true);
    try {
      const tx = new Transaction({ initiator: wallet });
      tx.delegateStake(rewardAddress, poolId);
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log("txHash", txHash);
      setSuccess(true);
    } catch (error) {
      console.log("Staking error: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>
          Your reward address is <b>{rewardAddress}</b>
        </p>
      </div>
      <div className="flex gap-4">
        <ButtonDemo
          fn={() => registerStake()}
          label="Register Stake"
          loading={loading}
          success={success}
        />
        <ButtonDemo
          fn={() => delegateStake()}
          label="Delegate Stake"
          loading={loading}
          success={success}
        />
      </div>
    </div>
  );
}
