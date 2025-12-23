import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/src/backend/utils/auth";
import { UserService } from "../services/UserService";

// ✅ CREATE SERVICE INSTANCE ONCE
const userService = new UserService();

export class UserHandler {
  static async getProfile(req: Request) {
    // ✅ SINGLE SOURCE OF AUTH TRUTH
    const user = await getUserFromRequest(req);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ instance method call (NOW VALID)
    const profile = await userService.getProfile(user.id);

    return NextResponse.json(profile);
  }
}
