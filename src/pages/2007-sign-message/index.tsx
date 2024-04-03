import { CardanoWallet, useWallet } from "@meshsdk/react";
import ButtonDemo from "@/components/ButtonDemo";
import { checkSignature, generateNonce } from "@meshsdk/core";
import { useState } from "react";

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
  const { wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function demo() {
    setLoading(true);

    // get user addresses
    const userStakeAddress = (await wallet.getRewardAddresses())[0];
    const userWalletAddress = (await wallet.getUsedAddresses())[0];

    if (userWalletAddress == undefined || userStakeAddress == undefined) return;

    // generate nonce
    const nonce = generateNonce("Sign this message to proof: ");

    // user sign message
    const signature = await wallet.signData(userStakeAddress, nonce);

    // verify signature
    const result = checkSignature(nonce, userStakeAddress, signature);

    // set database
    if (result) {
      setSuccess(true);
    } else {
      // somehow user signature does not match the wallet address?
    }
    setLoading(false);
  }

  return (
    <ButtonDemo
      fn={() => demo()}
      label="Sign message"
      loading={loading}
      success={success}
    />
  );
}
