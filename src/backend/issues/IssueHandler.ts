import { IssueService } from "../services/IssueService";

export class IssueHandler {
  constructor(private service = new IssueService()) {}

  async create(req: any, userId: string) {
    const body = await req.json();
    return this.service.createIssue({
      ...body,
      userId,
    });
  }

  async list(userId: string, type?: string) {
    return this.service.getIssuesByUser(userId, type);
  }

  async get(id: string) {
    return this.service.getIssueById(id);
  }

  async update(req: any, id: string) {
    const body = await req.json();
    return this.service.updateIssueById(id, body);
  }

  async remove(id: string) {
    return this.service.deleteIssueById(id);
  }
}
