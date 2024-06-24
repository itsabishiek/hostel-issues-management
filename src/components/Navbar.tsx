"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import UserMenu from "./UserMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type NavbarProps = {
  currentUser: User | null;
};

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="py-2 px-6 w-full bg-gray-100 rounded flex items-center justify-between">
      <Link href="/" className="text-[22px] text-black font-bold">
        Issue<span className="text-primary">Fix</span>
      </Link>

      <div className="flex items-center gap-2">
        {currentUser ? (
          <UserMenu currentUser={currentUser}>
            <Avatar className="bg-orange-500">
              <AvatarImage src="" />
              <AvatarFallback className="bg-orange-200 font-bold text-gray-600">
                {currentUser?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </UserMenu>
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link href="/signup">Signup</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
