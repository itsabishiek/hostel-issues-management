import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { userId, name, rollNo, department, roomNo, issueTitle, issueDesc } =
      await req.json();

    const issue = await prisma.issue.create({
      data: {
        userId,
        name,
        rollNo,
        department,
        roomNo,
        issueTitle,
        issueDesc,
        issueStatus: "Open",
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
