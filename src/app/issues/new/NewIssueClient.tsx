"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type NewIssueClientProps = {
  currentUser: User | null;
};

const NewIssueClient: React.FC<NewIssueClientProps> = ({ currentUser }) => {
  const [inputForm, setInputForm] = useState({
    issueTitle: "",
    issueDesc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIssueSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      toast({ title: "Login as a student to create issues!" });
      return;
    }

    if (currentUser?.role !== "Student") {
      toast({ title: "Only students can create issues!" });
      return;
    }

    if (!inputForm.issueTitle || !inputForm.issueDesc) {
      toast({ title: "All the fields are mandatory!" });
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/issues/new", {
        ...inputForm,
        userId: currentUser.id,
        name: currentUser.name,
        rollNo: currentUser.rollNo,
        roomNo: currentUser.roomNo,
        department: currentUser.department,
      })
      .then(() => {
        toast({ title: "Issue created successfully!" });
        router.push("/");
      })
      .catch((error) => {
        console.log("handleIssueSubmit Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)] flex items-center justify-center">
      <form
        onSubmit={handleIssueSubmit}
        className="flex flex-col items-center gap-4 p-4 rounded bg-[#ebebeb] max-w-[500px] w-full"
      >
        <h2 className="text-2xl font-bold">Specify your Issue</h2>

        <div className="flex flex-col gap-3 w-full">
          <Input
            type="text"
            className="bg-gray-100"
            placeholder="Issue Title"
            name="issueTitle"
            value={inputForm.issueTitle}
            onChange={handleChange}
          />
          <Textarea
            className="bg-gray-100"
            placeholder="Issue Description"
            rows={6}
            name="issueDesc"
            value={inputForm.issueDesc}
            onChange={handleChange}
          />
        </div>

        <Button className="w-full mt-1" type="submit" disabled={isLoading}>
          Create Issue
        </Button>
      </form>
    </div>
  );
};
export default NewIssueClient;
