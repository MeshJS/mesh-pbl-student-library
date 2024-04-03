import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonDemo({
  fn,
  label,
  loading,
  success,
}: {
  fn: () => void;
  label: string;
  loading: boolean;
  success: boolean;
}) {
  return (
    <Button
      onClick={fn}
      disabled={loading}
      variant={success ? "secondary" : "default"}
      className={success ? "bg-green-600 text-white" : ""}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}
