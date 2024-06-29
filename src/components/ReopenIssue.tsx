"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RefreshCcwDot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";

type ReopenIssueProps = {
  issueId: string;
  issue: Issue | null;
  currentUser: User | null;
};

const ReopenIssue: React.FC<ReopenIssueProps> = ({
  issueId,
  issue,
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleReopenIssue = () => {
    if (!issue) return;

    if (!currentUser || currentUser.role !== "Student") {
      toast({
        title: "Only students can reopen the issues!",
      });
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/issues/reopen", {
        issueId,
      })
      .then(() => {
        toast({
          title: "Issue has been reopened!",
        });

        router.refresh();
        revalidatePath(`/issues/${issueId}`, "page");
        setOpen(false);
      })
      .catch((error) => {
        console.log("handleReopenIssue Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <div className="w-[30px] h-[30px] rounded-full bg-primary flex items-center justify-center cursor-pointer">
                <RefreshCcwDot className="text-white w-[20px] h-[20px]" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reopen Issue</DialogTitle>
                <DialogDescription>
                  Are you sure, you want to reopen this issue?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleReopenIssue}
                  disabled={isLoading}
                >
                  Reopen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reopen Issue</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ReopenIssue;
