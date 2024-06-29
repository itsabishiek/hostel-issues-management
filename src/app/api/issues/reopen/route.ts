import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { issueId } = await req.json();

    const reopenIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        issueStatus: "Reopen",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(reopenIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
