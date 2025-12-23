import { prisma } from "../utils/prisma";

export class IssueRepository {
  async findById(id: string) {
    return prisma.issue.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string, type?: string) {
    return prisma.issue.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: any) {
    return prisma.issue.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.issue.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.issue.delete({
      where: { id },
    });
  }
}
