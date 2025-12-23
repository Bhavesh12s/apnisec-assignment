import { NextResponse } from "next/server";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthHandler {
  static async login(req: Request) {
    const body = await req.json();
    const result = await AuthService.login(body.email, body.password);
    return NextResponse.json(result);
  }

  static async register(req: Request) {
    const body = await req.json();
    const result = await AuthService.register(
      body.email,
      body.password,
      body.name
    );
    return NextResponse.json(result);
  }
}
