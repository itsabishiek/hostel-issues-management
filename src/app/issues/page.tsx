import PendingFallback from "@/components/PendingFallback";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleDot, RefreshCcwDot } from "lucide-react";
import Link from "next/link";
import React from "react";
import IssueCard from "../../components/IssueCard";
import getCurrentUser from "../actions/getCurrentUser";
import getIssues from "../actions/getIssues";
import getIssuesByUserId from "../actions/getIssuesByUserId";

type IssuesProps = {};

const Issues: React.FC<IssuesProps> = async () => {
  const currentUser = await getCurrentUser();
  const issues = await getIssues();
  const issuesByUserId = await getIssuesByUserId({
    userId: currentUser?.id as string,
  });

  return (
    <div className="bg-gray-100 rounded w-full mt-6 border border-gray-300 border-b-0">
      <div className="w-full bg-[#ebebeb] flex items-center justify-between gap-2 border-b border-gray-300 p-3 rounded">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer font-bold">
            <CircleDot className="text-yellow-500" />
            Open
          </div>
          <div className="flex items-center gap-2 cursor-pointer font-bold">
            <CircleCheck className="text-green-600" />
            Closed
          </div>
          <div className="hidden sm:flex items-center gap-2 cursor-pointer font-bold">
            <RefreshCcwDot className="text-primary" />
            Reopen
          </div>
        </div>

        <Button asChild className="font-bold">
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>

      {!currentUser ? (
        <PendingFallback isHome={true} notLoggedIn={true} />
      ) : (
        <>
          {currentUser?.role === "Student" ? (
            <>
              {issuesByUserId?.length === 0 ? (
                <PendingFallback isHome={true} />
              ) : (
                <>
                  {issuesByUserId?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {issues.length === 0 ? (
                <PendingFallback isHome={true} />
              ) : (
                <>
                  {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Issues;
