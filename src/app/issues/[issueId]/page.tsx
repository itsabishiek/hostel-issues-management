import getIssueById from "@/app/actions/getIssueById";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleDot } from "lucide-react";
import moment from "moment";
import React from "react";

type IssueProps = {
  params: {
    issueId: string;
  };
};

const Issue: React.FC<IssueProps> = async ({ params: { issueId } }) => {
  const issue = await getIssueById({ issueId });

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

        <Button>Close Issue</Button>
      </div>
    </div>
  );
};
export default Issue;
