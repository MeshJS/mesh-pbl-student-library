import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BlockfrostProvider } from "@meshsdk/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

// Add your Blockfrost API Key here:
const blockfrostApiKey = "";

export default function BlockfrostExample() {
  const blockfrostProvider = new BlockfrostProvider(blockfrostApiKey);

  // enter an address here:
  const address = "";

  const [makeQuery, setMakeQuery] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["blockfrostExampleQuery"],
    queryFn: () => {
      const res = blockfrostProvider.fetchAddressUTxOs(address);
      return res;
    },
    enabled: makeQuery,
  });

  // Project:
  // If you are familiar with React, build a form that allows a user to query a blockchain address.

  return (
    <Card className="border-black p-5 my-5">
      <CardTitle>Blockfrost Example</CardTitle>
      <CardContent>
        {blockfrostApiKey.length === 0 && (
          <div className="p-2 my-5 bg-gray-300">
            A blockfrost api key is required to use this example. See{" "}
            <Link href="https://pbl.meshjs.dev/course/mesh/102/lesson/1">Mesh PBL Lesson 102.1 to learn more</Link>.
          </div>
        )}
        {query.isLoading && <p className="p-2 my-5 bg-gray-300">Loading...</p>}
        {query.isFetched && <pre className="p-2 my-5 bg-gray-300">{JSON.stringify(query.data, null, 2)}</pre>}
        <Button className="mt-3" onClick={() => setMakeQuery(true)} disabled={blockfrostApiKey.length === 0}>
          Make Query
        </Button>
      </CardContent>
    </Card>
  );
}
