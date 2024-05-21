import Link from "next/link";
import PlutusScriptAddressExample from "./PlutusScriptAddressExample";
import RewardAddressExample from "./RewardAddressExample";
import SlotEpochExample from "./SlotEpochExample";
import TransactionHashExample from "./TransactionHashExample";

export default function Page() {
  return (
    <div className="mx-auto">
      <h1 className="text-xl my-3">Resolver Examples</h1>
      <p>
        These examples accompany{" "}
        <Link href="https://pbl.meshjs.dev/course/mesh/102/lesson/2">Lesson 102.2 in Mesh PBL</Link>
      </p>
      <TransactionHashExample />
      <RewardAddressExample />
      <PlutusScriptAddressExample />
      <SlotEpochExample />
    </div>
  );
}
