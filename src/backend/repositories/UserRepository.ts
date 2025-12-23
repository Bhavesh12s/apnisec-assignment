import { prisma } from "../utils/prisma";

export class UserRepository {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }
  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}
