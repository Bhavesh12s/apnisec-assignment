import { NextResponse } from "next/server";
import { AuthUtil } from "../utils/auth";
import { UserService } from "../services/UserService";

export class UserHandler {
  static async getProfile(req: Request) {
    try {
      const auth = req.headers.get("authorization");
      if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const token = auth.split(" ")[1];
      const payload = AuthUtil.verifyToken(token);

      const user = await UserService.getProfile(payload.userId);
      return NextResponse.json(user);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}
