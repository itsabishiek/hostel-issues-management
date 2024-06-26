import React from "react";

const PendingFallback = () => {
  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)] flex flex-col gap-2 items-center justify-center">
      <h2 className="text-3xl font-bold">Good News</h2>
      <p className="font-medium text-gray-400 text-lg">
        There&apos;s no pending issues.
      </p>
    </div>
  );
};

export default PendingFallback;
