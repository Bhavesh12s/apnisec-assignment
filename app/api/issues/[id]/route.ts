import { NextRequest, NextResponse } from "next/server";
import { IssueService } from "@/src/backend/services/IssueService";
import { getUserFromRequest } from "@/src/backend/utils/auth";

const issueService = new IssueService();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issue = await issueService.getIssueById(id);

  if (!issue || issue.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}
