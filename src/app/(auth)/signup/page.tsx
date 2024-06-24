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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("/api/signup", {
        ...inputForm,
        role,
      })
      .then(() => {
        toast({ title: "Registered Successfully, Login to your account" });
        router.push("/login");
      })
      .catch((error) => {
        console.log("handleSignup Error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)] flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center gap-4 p-4 rounded bg-[#ebebeb] max-w-[450px] w-full"
      >
        <h2 className="text-2xl font-bold">Signup</h2>

        <div className="flex flex-col gap-3 w-full">
          <Input
            type="text"
            className="bg-gray-100"
            placeholder="Name"
            name="name"
            value={inputForm.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            className="bg-gray-100"
            placeholder="Email"
            name="email"
            value={inputForm.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            className="bg-gray-100"
            placeholder="Password"
            name="password"
            value={inputForm.password}
            onChange={handleChange}
          />
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full bg-gray-100">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PRO">PRO</SelectItem>
              <SelectItem value="Principal">Principal</SelectItem>
              <SelectItem value="Executive Director">
                Executive Director
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full mt-1" type="submit" disabled={isLoading}>
          Signup
        </Button>
        <div className="text-[15px] mt-1">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;
