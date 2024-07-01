import { Button } from "@/components/ui/button";
import Link from "next/link";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)]">
      <div className="bg-[url('/krgi.jpg')] w-full h-[calc(100vh-184px)] rounded overflow-hidden bg-no-repeat bg-cover bg-center">
        <div className="flex flex-col items-center justify-center gap-3 w-full h-full backdrop-brightness-50 text-white">
          <h1 className="text-6xl font-extrabold">Welcome to IssueFix</h1>
          <p className="text-lg text-white font-medium">
            Get your hostel issues sorted in days not weeks.
          </p>
          <Button className="mt-3 w-[200px]" size="lg" asChild>
            <Link href={currentUser ? "/issues" : "/signup"}>Get started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
