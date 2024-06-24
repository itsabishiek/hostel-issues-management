"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type NewIssueProps = {};

const NewIssue: React.FC<NewIssueProps> = () => {
  const [inputForm, setInputForm] = useState({
    name: "",
    rollNo: "",
    roomNo: "",
    issueTitle: "",
    issueDesc: "",
  });
  const [department, setDepartment] = useState("");
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

  const handleDeptChange = (value: string) => {
    setDepartment(value);
  };

  const handleIssueSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !inputForm.name ||
      !inputForm.roomNo ||
      !inputForm.rollNo ||
      !inputForm.issueTitle ||
      !inputForm.issueDesc ||
      !department
    ) {
      toast({ title: "All the fields are mandatory!" });
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/issues/new", {
        ...inputForm,
        department,
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
        <h2 className="text-2xl font-bold">Create Issue</h2>

        <div className="flex flex-col gap-3 w-full">
          <Input
            type="text"
            className="bg-gray-100"
            placeholder="Student Name"
            name="name"
            value={inputForm.name}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className="bg-gray-100"
              placeholder="Student RollNo"
              name="rollNo"
              value={inputForm.rollNo}
              onChange={handleChange}
            />
            <Input
              type="text"
              className="bg-gray-100"
              placeholder="Hostel RoomNo"
              name="roomNo"
              value={inputForm.roomNo}
              onChange={handleChange}
            />
          </div>
          <Select onValueChange={handleDeptChange}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AIML">AIML</SelectItem>
              <SelectItem value="AIDS">AIDS</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
              <SelectItem value="EEE">EEE</SelectItem>
              <SelectItem value="CSBS">CSBS</SelectItem>
              <SelectItem value="MECH">MECH</SelectItem>
            </SelectContent>
          </Select>

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
            rows={4}
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
export default NewIssue;
