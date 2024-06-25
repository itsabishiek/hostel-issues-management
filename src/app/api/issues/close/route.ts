import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { issueId } = await req.json();

    const closeIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        issueStatus: "Closed",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(closeIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
