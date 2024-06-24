import { CircleCheck, CircleDot } from "lucide-react";
import IssueCard from "../components/IssueCard";

export default function Home() {
  return (
    <div className="bg-gray-100 rounded w-full mt-6 border border-gray-300 border-b-0">
      <div className="w-full bg-[#ebebeb] flex items-center gap-2 border-b border-gray-300 p-3 rounded">
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

      <IssueCard />
      <IssueCard />
      <IssueCard />
      <IssueCard />
    </div>
  );
}
