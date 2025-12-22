import { IssueRepository } from "../repositories/IssueRepository";

export class IssueService {
  private repo: IssueRepository;

  constructor() {
    this.repo = new IssueRepository();
  }

  async getIssues(userId: string, type?: string) {
    return this.repo.findByUser(userId, type);
  }

  async createIssue(userId: string, data: any) {
    return this.repo.create({
      title: data.title,
      description: data.description,
      type: data.type,
      priority: data.priority,
      status: data.status ?? "Open",
      userId,
    });
  }
}
