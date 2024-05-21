import { Card } from "@/components/ui/card";
import { resolveEpochNo, resolveSlotNo } from "@meshsdk/core";
import { useEffect, useState } from "react";

export default function SlotEpochExample() {
  const [slot, setSlot] = useState<string>("0");
  const [epoch, setEpoch] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlot(resolveSlotNo("preprod"));
      setEpoch(resolveEpochNo("preprod"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-black p-5 my-5">
      {/* Existing Codes */}
      <h2 className="text-2xl font-bold">Epoch and Slot</h2>
      <p>
        Slot: <span className="font-bold">{slot}</span>
      </p>
      <p>
        Epoch: <span className="font-bold">{epoch}</span>
      </p>
    </Card>
  );
}
