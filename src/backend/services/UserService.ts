import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  static getProfile(userId: string) {
    return UserRepository.findById(userId);
  }

  static updateProfile(userId: string, data: any) {
    return UserRepository.update(userId, data);
  }
}
