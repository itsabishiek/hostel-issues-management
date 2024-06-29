"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Issue, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

type CloseIssueProps = {
  issueId: string;
  issue: Issue | null;
  currentUser: User | null;
  isReopen?: boolean;
};

const CloseIssue: React.FC<CloseIssueProps> = ({
  issueId,
  issue,
  currentUser,
  isReopen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCloseIssue = () => {
    if (!issue) return;

    if (!currentUser || currentUser.role !== "PRO") {
      toast({
        title: "You need to be loggedin as a PRO!",
      });
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/issues/close", {
        issueId,
      })
      .then(() => {
        toast({
          title: "Issue has been closed!",
        });

        router.refresh();
        revalidatePath(`/issues/${issueId}`, "page");
      })
      .catch((error) => {
        console.log("handleCloseIssue Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Button onClick={handleCloseIssue} disabled={isLoading}>
        {isReopen ? "Report to principal and close issue" : "Close Issue"}
      </Button>
    </div>
  );
};
export default CloseIssue;
