import { prisma } from "../utils/prisma";

export class IssueRepository {
  async findByUser(userId: string, type?: string) {
    return prisma.issue.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(data: {
    title: string;
    description: string;
    type: string;
    priority?: string;
    status?: string;
    userId: string;
  }) {
    return prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        priority: data.priority,
        status: data.status,
        user: {
          connect: { id: data.userId },
        },
      },
    });
  }
}
