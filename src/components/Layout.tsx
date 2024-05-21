import Navbar from "./Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </main>
    </div>
  );
}
