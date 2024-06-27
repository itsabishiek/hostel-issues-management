import React from "react";

type PendingFallbackProps = {
  isHome?: boolean;
  notLoggedIn?: boolean;
};

const PendingFallback: React.FC<PendingFallbackProps> = ({
  isHome,
  notLoggedIn,
}) => {
  return (
    <div
      className="bg-gray-100 rounded w-full mt-5 p-4 flex flex-col gap-2 items-center justify-center"
      style={
        isHome
          ? { height: "calc(100vh - 184px - 89px)" }
          : { height: "calc(100vh - 220px)" }
      }
    >
      <h2 className="text-3xl font-bold">Good News</h2>
      {notLoggedIn ? (
        <p className="font-medium text-gray-400 text-lg">
          Login/Signup to post your issues and rectified shortly!
        </p>
      ) : (
        <p className="font-medium text-gray-400 text-lg">
          There&apos;s no pending issues.
        </p>
      )}
    </div>
  );
};

export default PendingFallback;
