import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { name, rollNo, department, roomNo, issueTitle, issueDesc } =
      await req.json();

    const issue = await prisma.issue.create({
      data: {
        name,
        rollNo,
        department,
        roomNo,
        issueTitle,
        issueDesc,
        issueStatus: "Open",
        isPRO: true,
        isPrincipal: false,
        isED: false,
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
