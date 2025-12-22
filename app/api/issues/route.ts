export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/src/backend/utils/auth";
import { IssueService } from "@/src/backend/services/IssueService";

const issueService = new IssueService();

export async function GET(req: Request) {
  const user = getUserFromRequest(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || undefined;

  const issues = await issueService.getIssues(user.id, type);
  return NextResponse.json(issues);
}

export async function POST(req: Request) {
  const user = getUserFromRequest(req);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const issue = await issueService.createIssue(user.id, body);
  return NextResponse.json(issue);
}
