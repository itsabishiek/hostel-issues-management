import { Issue } from "@prisma/client";
import { CircleCheck, CircleDot, RefreshCcwDot } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

type IssueCardProps = {
  issue: Issue;
};

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <div className="p-3 flex gap-3 border-b border-gray-300">
      {issue.issueStatus === "Open" ? (
        <CircleDot className="text-yellow-500 mt-1" />
      ) : issue.issueStatus === "Reopen" ? (
        <RefreshCcwDot className="text-primary mt-1" />
      ) : (
        <CircleCheck className="text-green-600 mt-1" />
      )}

      <div className="flex flex-col ">
        <Link
          href={`/issues/${issue.id}`}
          className="font-bold text-[18px] hover:text-primary"
        >
          {issue.issueTitle}
        </Link>
        <p className="text-sm text-gray-500 font-medium">
          opened on {moment(issue?.createdAt).fromNow()}, by {issue.name} in
          RoomNo {issue.roomNo}
        </p>
      </div>
    </div>
  );
};
export default IssueCard;
