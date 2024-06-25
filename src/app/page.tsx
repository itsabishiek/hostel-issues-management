import { CircleCheck, CircleDot } from "lucide-react";
import IssueCard from "../components/IssueCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getIssues from "./actions/getIssues";

export default async function Home() {
  const issues = await getIssues();

  return (
    <div className="bg-gray-100 rounded w-full mt-6 border border-gray-300 border-b-0">
      <div className="w-full bg-[#ebebeb] flex items-center justify-between gap-2 border-b border-gray-300 p-3 rounded">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer font-bold">
            <CircleDot className="text-yellow-500" />
            Open
          </div>
          <hr className="h-[30px] border-red-500" />
          <div className="flex items-center gap-2 cursor-pointer font-bold">
            <CircleCheck className="text-green-600" />
            Closed
          </div>
        </div>

        <Button asChild className="font-bold">
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>

      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
