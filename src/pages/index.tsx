import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const demos = [
  {
    title: "Wallet information (101.3)",
    description: "Get information about the wallet.",
    url: "1013-wallet-info",
  },
  {
    title: "Using Providers (102.1)",
    description: "Get information about the blockchain.",
    url: "1021-utilities-providers",
  },
  {
    title: "Using Resolvers (102.2)",
    description: "Helpful functions for building dApps.",
    url: "1022-utilities-resolvers",
  },
  {
    title: "Basic transaction (200.1)",
    description: "Send ADA from one or more addresses",
    url: "2001-basic-transaction",
  },
  {
    title: "Transaction with assets (200.2)",
    description: "Send ADA and assets in a single transaction.",
    url: "2002-transaction-assets",
  },
  {
    title: "Minting tokens (200.3)",
    description: "Mint tokens using a Native script and Plutus script.",
    url: "2003-minting",
  },
  {
    title: "Multi-sig transaction (200.4)",
    description: "Create a multi-sig transaction.",
    url: "2004-multi-sig-transaction",
  },
  {
    title: "Smart contract (200.5)",
    description: "Lock and redeem assets using a smart contract.",
    url: "2005-smart-contract",
  },
  {
    title: "Register and delegate stakepool (200.6)",
    description: "Register wallet address and delegate to a stake pool.",
    url: "2006-stake",
  },
  {
    title: "Sign message (200.7)",
    description: "Sign a message using the wallet.",
    url: "2007-sign-message",
  },
  {
    title: "Mesh wallet (201.1 & 201.2)",
    description: "Load Mesh wallet and send lovelace",
    url: "2012-mesh-wallet",
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
      {demos.map((demo) => (
        <DemoCard
          key={demo.title}
          title={demo.title}
          description={demo.description}
          url={demo.url}
        />
      ))}
    </div>
  );
}

function DemoCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={url}>
          <Button>Explore</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
