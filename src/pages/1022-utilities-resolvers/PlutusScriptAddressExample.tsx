import { PlutusScript, resolvePlutusScriptAddress, resolvePlutusScriptHash } from "@meshsdk/core";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export default function PlutusScriptAddressExample() {
  const [scriptAddress, setScriptAddress] = useState<string>("");
  const [scriptHash, setScriptHash] = useState<string>("");

  useEffect(() => {
    const script: PlutusScript = {
      code: "4e4d01000033222220051200120011",
      version: "V1",
    };

    const address = resolvePlutusScriptAddress(script);
    setScriptAddress(address);
    const hash = resolvePlutusScriptHash(address);
    setScriptHash(hash);
  }, []);

  return (
    <Card className="border-black p-5 my-5">
      <h2 className="text-2xl font-bold">Plutus Script Address and Hash</h2>
      <p>
        Address: <span className="font-bold">{scriptAddress}</span>
      </p>
      <p>
        Hash: <span className="font-bold">{scriptHash}</span>
      </p>
    </Card>
  );
}
