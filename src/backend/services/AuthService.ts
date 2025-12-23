import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<{ id: string; email: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    // ✅ RETURN ONLY WHAT YOU NEED
    return {
      id: user.id,
      email: user.email,
    };
  }
  static async register(
    email: string,
    password: string,
    name: string
  ) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}
