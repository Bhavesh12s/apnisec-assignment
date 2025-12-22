import jwt from "jsonwebtoken";

export function getUserFromRequest(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string; email: string };

    return decoded?.id ? decoded : null;
  } catch {
    return null;
  }
}
