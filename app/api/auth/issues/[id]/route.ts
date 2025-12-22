import { NextResponse } from "next/server";
import { IssueHandler } from "@/src/backend/issues/IssueHandler";
import { getUserFromToken } from "@/src/backend/utils/auth";

const handler = new IssueHandler();

export async function GET(_: Request, { params }: any) {
  const issue = await handler.get(params.id);
  return NextResponse.json(issue);
}

export async function PUT(req: Request, { params }: any) {
  const user = getUserFromToken(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updated = await handler.update(req, params.id);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: any) {
  const user = getUserFromToken(_);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await handler.remove(params.id);
  return NextResponse.json({ success: true });
}
