import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="py-2 px-6 w-full bg-gray-100 rounded flex items-center justify-between">
      <Link href="/" className="text-[22px] text-black font-bold">
        Issue<span className="text-primary">Fix</span>
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>

        <Button asChild>
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
