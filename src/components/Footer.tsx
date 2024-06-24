import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-gray-100 p-4 w-full rounded mt-5 text-center text-[15.5px] text-gray-500">
      &copy; {new Date().getFullYear()}{" "}
      <span className="font-bold">
        Issue
        <span className="text-primary">Fix</span>
      </span>{" "}
      | All rights reserved
    </div>
  );
};
export default Footer;
