import prisma from "@/lib/prismadb";

export default async function getOpenIssuesForED() {
  try {
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    const issues = await prisma.issue.findMany({
      where: {
        createdAt: {
          lte: fourDaysAgo,
        },
      },
    });

    if (!issues) return null;

    return issues;
  } catch (error: any) {
    throw new Error(error);
  }
}
