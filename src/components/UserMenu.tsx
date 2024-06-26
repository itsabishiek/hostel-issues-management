"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserMenuProps = {
  children: React.ReactNode;
  currentUser: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ children, currentUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{currentUser?.name} </DropdownMenuLabel>
        <DropdownMenuLabel className="bg-primary px-2 py-1 w-fit rounded-md text-white text-xs ml-2">
          {currentUser?.role}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {(currentUser?.role === "Principal" ||
          currentUser?.role === "Executive Director") && (
          <DropdownMenuItem asChild>
            <Link href="/issues/open">Pending Issues</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
