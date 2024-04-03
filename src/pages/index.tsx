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
      {/* <CardContent>sss</CardContent> */}
      <CardFooter className="flex justify-between">
        <Link href={url}>
          <Button>Explore</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
