import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const GET = async (req: Request) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    const updatedPricipalIssues = await prisma.issue.updateMany({
      where: {
        createdAt: {
          lte: twoDaysAgo,
        },
      },
      data: {
        isPrincipal: true,
        updatedAt: new Date(),
      },
    });

    const updatedEDIssues = await prisma.issue.updateMany({
      where: {
        updatedAt: {
          lte: fourDaysAgo,
        },
      },
      data: {
        isED: true,
        updatedAt: new Date(),
      },
    });

    if (updatedPricipalIssues.count === 0 && updatedEDIssues.count === 0) {
      return NextResponse.json(
        { message: "No records updated" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Records has been updated" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
