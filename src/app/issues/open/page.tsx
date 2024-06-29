import getCurrentUser from "@/app/actions/getCurrentUser";
import getOpenIssuesForED from "@/app/actions/getOpenIssuesForED";
import getOpenIssuesForPrincipal from "@/app/actions/getOpenIssuesForPrincipal";
import getReopenedIssues from "@/app/actions/getReopenedIssues";
import IssueCard from "@/components/IssueCard";
import PendingFallback from "@/components/PendingFallback";
import React from "react";

type OpenIssuesProps = {};

const OpenIssues: React.FC<OpenIssuesProps> = async () => {
  const issuesForPricipal = await getOpenIssuesForPrincipal();
  const issuesForED = await getOpenIssuesForED();
  const reopenedIssues = await getReopenedIssues();
  const currentUser = await getCurrentUser();

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)]">
      {currentUser?.role === "Principal" ? (
        <>
          {issuesForPricipal?.length !== 0 || reopenedIssues?.length !== 0 ? (
            <div className="flex flex-col gap-7">
              {issuesForPricipal?.length !== 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold text-2xl">Pending Issues</h2>

                  {issuesForPricipal?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              )}

              {reopenedIssues?.length !== 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold text-2xl">Reopened Issues</h2>

                  {reopenedIssues?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <PendingFallback />
          )}
        </>
      ) : currentUser?.role === "Executive Director" ? (
        <>
          {issuesForED?.length !== 0 || reopenedIssues?.length !== 0 ? (
            <div className="flex flex-col gap-7">
              {issuesForED?.length !== 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold text-2xl">Pending Issues</h2>

                  {issuesForED?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              )}

              {reopenedIssues?.length !== 0 && (
                <div className="flex flex-col gap-3">
                  <h2 className="font-bold text-2xl">Reopened Issues</h2>

                  {reopenedIssues?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <PendingFallback />
          )}
        </>
      ) : (
        <PendingFallback />
      )}
    </div>
  );
};
export default OpenIssues;
