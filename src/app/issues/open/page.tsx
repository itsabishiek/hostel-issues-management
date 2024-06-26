import getCurrentUser from "@/app/actions/getCurrentUser";
import getIssues from "@/app/actions/getIssues";
import getOpenIssuesForED from "@/app/actions/getOpenIssuesForED";
import getOpenIssuesForPrincipal from "@/app/actions/getOpenIssuesForPrincipal";
import IssueCard from "@/components/IssueCard";
import PendingFallback from "@/components/PendingFallback";
import React from "react";

type OpenIssuesProps = {};

const OpenIssues: React.FC<OpenIssuesProps> = async () => {
  const issuesForPricipal = await getOpenIssuesForPrincipal();
  const issuesForED = await getOpenIssuesForED();
  const issues = await getIssues();
  const currentUser = await getCurrentUser();

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)]">
      {currentUser?.role === "Principal" ? (
        <>
          {issuesForPricipal?.length !== 0 ? (
            <>
              {issuesForPricipal?.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </>
          ) : (
            <PendingFallback />
          )}
        </>
      ) : currentUser?.role === "Executive Director" ? (
        <>
          {issuesForED?.length !== 0 ? (
            <>
              {issuesForED?.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </>
          ) : (
            <PendingFallback />
          )}
        </>
      ) : (
        <>
          {issues?.length !== 0 ? (
            <>
              {issues?.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </>
          ) : (
            <PendingFallback />
          )}
        </>
      )}
    </div>
  );
};
export default OpenIssues;
