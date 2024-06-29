import getCurrentUser from "@/app/actions/getCurrentUser";
import getIssueById from "@/app/actions/getIssueById";
import CloseIssue from "@/components/CloseIssue";
import ReopenIssue from "@/components/ReopenIssue";
import { CircleCheck, CircleDot, RefreshCcwDot } from "lucide-react";
import moment from "moment";
import React from "react";

type IssueProps = {
  params: {
    issueId: string;
  };
};

const Issue: React.FC<IssueProps> = async ({ params: { issueId } }) => {
  const issue = await getIssueById({ issueId });
  const currentUser = await getCurrentUser();

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)] flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-[#ebebeb] rounded p-6 max-w-[700px] w-full">
        <div>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[30px] font-extrabold">
              <span className="text-gray-400">#{issue?.roomNo}</span>{" "}
              {issue?.issueTitle}
            </h1>

            {issue?.issueStatus === "Open" ? (
              <span className="px-3 py-2 bg-yellow-500 text-white font-bold flex items-center gap-2 rounded-full">
                <CircleDot className="text-white" />
                {issue?.issueStatus}
              </span>
            ) : issue?.issueStatus === "Reopen" ? (
              <span className="px-3 py-2 bg-primary text-white font-bold flex items-center gap-2 rounded-full">
                <RefreshCcwDot className="text-white" />
                {issue?.issueStatus}
              </span>
            ) : (
              <span className="px-3 py-2 bg-green-600 text-white font-bold flex items-center gap-2 rounded-full">
                <CircleCheck className="text-white" />
                {issue?.issueStatus}
              </span>
            )}
          </div>

          <div className="text-gray-400">
            {issue?.name} opened this issue on{" "}
            {moment(issue?.createdAt).fromNow()}
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex-grow">
            <div className="text-lg text-gray-500 font-medium">
              {issue?.issueDesc}
            </div>
          </div>
          <div className="flex-[0_0_40%] bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-bold text-primary">Student Details</h3>

            <div className="mt-2 text-gray-700">
              <div>
                <b>Name</b>: {issue?.name}
              </div>
              <div>
                <b>RollNo</b>: {issue?.rollNo}
              </div>
              <div>
                <b>Department</b>: {issue?.department}
              </div>
              <div>
                <b>RoomNo</b>: {issue?.roomNo}
              </div>
            </div>
          </div>
        </div>

        {issue?.issueStatus === "Open" && (
          <CloseIssue
            issueId={issueId}
            issue={issue}
            currentUser={currentUser}
          />
        )}

        {issue?.issueStatus === "Closed" && (
          <div className="flex items-center gap-2">
            <div className="border border-orange-400 px-2 py-1 bg-orange-100 w-fit rounded-full text-[14px] font-semibold">
              Closed on {moment(issue?.updatedAt).fromNow()}
            </div>

            <ReopenIssue
              issueId={issueId}
              issue={issue}
              currentUser={currentUser}
            />
          </div>
        )}

        {issue?.issueStatus === "Reopen" && (
          <div className="flex flex-col gap-1">
            <CloseIssue
              issueId={issueId}
              issue={issue}
              currentUser={currentUser}
              isReopen={true}
            />

            <div className="text-[15px] px-2 font-semibold text-gray-500">
              Ropened on {moment(issue?.updatedAt).fromNow()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Issue;
