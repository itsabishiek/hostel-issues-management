import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, email, password, role, department, rollNo, roomNo } =
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    if (role === "Student") {
      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          role,
          rollNo,
          roomNo,
          department,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          role,
        },
      });
    }

    return NextResponse.json("Registered Successfully!", { status: 201 });
  } catch (error) {
    return NextResponse.json("Account not created", { status: 401 });
  }
};
