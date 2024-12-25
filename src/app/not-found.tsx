import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        404
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 text-center">
        This page could not be found
      </p>

      <Link href="/">
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}