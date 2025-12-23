import { IssueRepository } from "../repositories/IssueRepository";

export class IssueService {
  private repo = new IssueRepository();

  getIssueById(id: string) {
    return this.repo.findById(id);
  }

  getIssuesByUser(userId: string, type?: string) {
    return this.repo.findByUser(userId, type);
  }

  createIssue(data: any) {
    return this.repo.create(data);
  }

  updateIssueById(id: string, data: any) {
    return this.repo.update(id, data);
  }

  deleteIssueById(id: string) {
    return this.repo.delete(id);
  }
}
