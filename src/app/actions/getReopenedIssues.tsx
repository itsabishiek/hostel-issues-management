import prisma from "@/lib/prismadb";

export default async function getReopenedIssues() {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        issueStatus: "Reopen",
      },
    });

    if (!issues) return null;

    return issues;
  } catch (error: any) {
    throw new Error(error);
  }
}
