import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private repo: UserRepository;

  constructor() {
    this.repo = new UserRepository();
  }

  getProfile(userId: string) {
    return this.repo.findById(userId);
  }

  updateProfile(userId: string, data: any) {
    return this.repo.update(userId, data);
  }
}
