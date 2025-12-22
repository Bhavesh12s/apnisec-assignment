import { NextResponse } from "next/server";
import { IssueService } from "@/src/backend/services/IssueService";
import { getUserFromToken } from "@/src/backend/utils/auth";
import { RateLimiter } from "@/src/backend/utils/Ratelimiter";

const issueService = new IssueService();

/**
 * GET /api/issues/[id]
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rate = RateLimiter.check(`issue-get-${params.id}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": rate.limit.toString(),
          "X-RateLimit-Remaining": rate.remaining.toString(),
          "X-RateLimit-Reset": rate.reset.toString(),
        },
      }
    );
  }

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issue = await issueService.getIssue(params.id);

  if (!issue || issue.userId !== user.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

/**
 * PUT /api/issues/[id]
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rate = RateLimiter.check(`issue-put-${params.id}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const issue = await issueService.getIssue(params.id);

  if (!issue || issue.userId !== user.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await issueService.updateIssue(params.id, body);
  return NextResponse.json(updated);
}

/**
 * DELETE /api/issues/[id]
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const rate = RateLimiter.check(`issue-delete-${params.id}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issue = await issueService.getIssue(params.id);

  if (!issue || issue.userId !== user.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await issueService.deleteIssue(params.id);
  return NextResponse.json({ message: "Issue deleted successfully" });
}
