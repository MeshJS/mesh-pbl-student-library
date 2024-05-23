import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MaestroProvider } from "@meshsdk/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

// Add your Maestro API Key here:
const maestroApiKey = "";

export default function MaestroExample() {
  const maestroProvider = new MaestroProvider({
    network: "Preprod",
    apiKey: maestroApiKey, // Get yours by visiting https://docs.gomaestro.org/docs/Getting-started/Sign-up-login.
    turboSubmit: false, // Read about paid turbo transaction submission feature at https://docs.gomaestro.org/docs/Dapp%20Platform/Turbo%20Transaction.
  });

  // enter an address here:
  const address = "";

  // Project:
  // If you are familiar with React, build a form that allows a user to query a blockchain address.

  const [makeQuery, setMakeQuery] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["address"],
    queryFn: () => {
      const res = maestroProvider.fetchAddressUTxOs(address);
      return res;
    },
    enabled: makeQuery,
  });

  return (
    <Card className="border-black p-5">
      <CardTitle>Maestro Example</CardTitle>
      <CardContent>
        {maestroApiKey.length === 0 && (
          <div className="p-2 my-5 bg-gray-300">
            A Maestro API key is required to use this example. See{" "}
            <Link href="https://pbl.meshjs.dev/course/mesh/102/lesson/1">Mesh PBL Lesson 102.1 to learn more</Link>.
          </div>
        )}
        {query.isLoading && <p className="p-2 my-5 bg-gray-300">Loading...</p>}
        {query.isFetched && <pre className="p-2 my-5 bg-gray-300">{JSON.stringify(query.data, null, 2)}</pre>}
        <Button className="mt-3" onClick={() => setMakeQuery(true)} disabled={maestroApiKey.length === 0}>
          Make Query
        </Button>
      </CardContent>
    </Card>
  );
}
