import { IssueService } from "./IssueService";

export class IssueHandler {
  constructor(private service = new IssueService()) {}

  async create(req: any, userId: string) {
    const body = await req.json();
    return this.service.createIssue(userId, body);
  }

  async list(userId: string, type?: string) {
    return this.service.getIssues(userId, type);
  }

  async get(id: string) {
    return this.service.getIssue(id);
  }

  async update(req: any, id: string) {
    const body = await req.json();
    return this.service.updateIssue(id, body);
  }

  async remove(id: string) {
    return this.service.deleteIssue(id);
  }
}
