import { DeleteResult, getRepository, Repository } from 'typeorm';
import { User } from '@models/User';

class UserService {
  async getUsers() {
    const userRepository: Repository<User> = getRepository(User);
    const users: User[] = await userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'consents.id', 'consents.enabled'])
      .leftJoin('user.consents', 'consents')
      .getMany();

    return users;
  }

  async getUser(idUser: string) {
    const userRepository: Repository<User> = getRepository(User);
    const user: User = await userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'consents.id', 'consents.enabled'])
      .leftJoin('user.consents', 'consents')
      .where('user.id = :id', { id: idUser })
      .getOne();

    return user;
  }

  async addUser(user: User) {
    const userRepository: Repository<User> = getRepository(User);
    return userRepository.save({ ...user, consents: [] });
  }

  async deleteUser(idUser: string) {
    const userRepository: Repository<User> = getRepository(User);
    const deleteResult: DeleteResult = await userRepository.delete(idUser);

    return {
      id: idUser,
      status: deleteResult.affected > 0,
    };
  }
}

export default new UserService();