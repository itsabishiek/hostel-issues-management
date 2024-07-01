"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await signIn("credentials", {
      ...inputForm,
      redirect: true,
      callbackUrl: "/issues",
    });

    if (user?.ok) {
      toast({ title: "You're loggedin successfully!" });
    }

    if (user?.error) {
      toast({ title: user.error });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 rounded w-full mt-5 p-4 h-[calc(100vh-184px)] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-4 p-4 rounded bg-[#ebebeb] max-w-[450px] w-full"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        <div className="flex flex-col gap-3 w-full">
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
        </div>

        <Button className="w-full mt-1" type="submit" disabled={isLoading}>
          Login
        </Button>
        <div className="text-[15px] mt-1">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-bold">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
