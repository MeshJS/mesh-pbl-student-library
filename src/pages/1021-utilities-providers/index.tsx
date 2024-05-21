import Link from "next/link";
import BlockfrostExample from "./BlockfrostExample";
import KoiosExample from "./KoiosExample";
import MaestroExample from "./MaestroExample";


export default function Page() {
  return (
    <div className="mx-auto">
      <h1 className="text-xl my-3">Provider Examples</h1>
      <p>
        These examples accompany{" "}
        <Link href="https://pbl.meshjs.dev/course/mesh/102/lesson/1">Lesson 102.1 in Mesh PBL</Link>
      </p>
      <BlockfrostExample />
      <KoiosExample />
      <MaestroExample />
    </div>
  );
}
