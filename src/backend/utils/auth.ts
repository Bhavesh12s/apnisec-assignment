import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type AuthUser = {
  id: string;
  email: string;
};

/**
 * ✅ SINGLE SOURCE OF AUTH TRUTH
 * Used by ALL route handlers
 */
export async function getUserFromRequest(
  req: Request
): Promise<AuthUser | null> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

    return {
      id: decoded.id,
      email: decoded.email,
    };
  } catch {
    return null;
  }
}
