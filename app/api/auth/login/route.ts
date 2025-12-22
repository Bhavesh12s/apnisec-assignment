import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AuthService } from "@/src/backend/services/AuthService";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await AuthService.login(email, password);

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return NextResponse.json({ token });
}
