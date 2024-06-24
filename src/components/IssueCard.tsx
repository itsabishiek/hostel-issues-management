import { CircleDot } from "lucide-react";
import Link from "next/link";
import React from "react";

type IssueCardProps = {};

const IssueCard: React.FC<IssueCardProps> = () => {
  return (
    <div className="p-3 flex gap-3 border-b border-gray-300">
      <CircleDot className="text-yellow-500 mt-1" />

      <div className="flex flex-col ">
        <Link
          href={`/issues/123`}
          className="font-bold text-[18px] hover:text-primary"
        >
          Api is not working
        </Link>
        <p className="text-sm text-gray-500 font-medium">
          opened on Nov 26, by Abishiek in RoomNo 414
        </p>
      </div>
    </div>
  );
};
export default IssueCard;
