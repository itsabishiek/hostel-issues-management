import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async (req: Request) => {
  try {
    const updatedIssue = await prisma.issue.updateMany({
      data: {
        isPrincipal: true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
