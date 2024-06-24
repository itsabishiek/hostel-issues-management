import prisma from "@/lib/prismadb";

interface IssueParams {
  issueId: string;
}

export default async function getIssueById({ issueId }: IssueParams) {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!issue) {
      return null;
    }

    return issue;
  } catch (error: any) {
    throw new Error(error);
  }
}
