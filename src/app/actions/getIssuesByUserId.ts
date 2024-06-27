import prisma from "@/lib/prismadb";

interface IssuesParams {
  userId: string;
}

export default async function getIssuesByUserId({ userId }: IssuesParams) {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        userId,
      },
    });

    if (!issues) {
      return null;
    }

    return issues;
  } catch (error: any) {
    throw new Error(error);
  }
}
