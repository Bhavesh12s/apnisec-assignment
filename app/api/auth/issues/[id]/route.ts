import { NextResponse } from "next/server";
import { IssueService } from "@/src/backend/services/IssueService";
import { getUserFromToken } from "@/src/backend/utils/auth";

const issueService = new IssueService();

export async function GET(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || undefined;

  const issues = await issueService.getIssuesByUser(user.id, type);
  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const user = await getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const issue = await issueService.createIssue({ ...body, userId: user.id });

  return NextResponse.json(issue);
}
