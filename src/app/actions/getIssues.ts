import prisma from "@/lib/prismadb";

export default async function getIssues() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return issues;
  } catch (error: any) {
    throw new Error(error);
  }
}
