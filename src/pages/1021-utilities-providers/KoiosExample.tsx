import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { KoiosProvider } from "@meshsdk/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

// 2024-05-21: The Koios query URL in Mesh might be outdated:
// getting 404 on https://preprod.koios.rest/api/v0/address_info

// Get Koios Token:
const koiosToken = "";

export default function KoiosExample() {
  const koiosProvider = new KoiosProvider("preprod", koiosToken);

  const [makeQuery, setMakeQuery] = useState<boolean>(false);

  // Paste a Preprod Address
  const address = "";

  const query = useQuery({
    queryKey: ["koiosExampleQuery"],
    queryFn: () => {
      const res = koiosProvider.fetchAddressUTxOs(address);
      return res;
    },
    enabled: makeQuery,
  });

  // Project:
  // If you are familiar with React, build a form that allows a user to query a blockchain address.

  return (
    <Card className="border-black p-5 my-5">
      <CardTitle>Koios Example</CardTitle>
      <CardContent>
        {koiosToken.length === 0 && (
          <div className="p-2 my-5 bg-gray-300">
            A Koios Token is required to use this example. See{" "}
            <Link href="https://pbl.meshjs.dev/course/mesh/102/lesson/1">Mesh PBL Lesson 102.1 to learn more</Link>.
          </div>
        )}
        {query.isLoading && <p className="p-2 my-5 bg-gray-300">Loading...</p>}
        {query.isFetched && <pre className="p-2 my-5 bg-gray-300">{JSON.stringify(query.data, null, 2)}</pre>}
        <Button className="mt-3" onClick={() => setMakeQuery(true)} disabled={koiosToken.length === 0}>
          Make Query
        </Button>
      </CardContent>
    </Card>
  );
}
