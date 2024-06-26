import prisma from "@/lib/prismadb";

export default async function getOpenIssuesForPrincipal() {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const issues = await prisma.issue.findMany({
      where: {
        createdAt: {
          lte: twoDaysAgo,
        },
      },
    });

    if (!issues) return null;

    return issues;
  } catch (error: any) {
    throw new Error(error);
  }
}
