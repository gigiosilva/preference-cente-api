import { Request, Response } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';

class UserController {
  async getUsers(req: Request, res: Response) {
    const users: User[] = await UserService.getUsers();
    return res.status(200).json(users);
  }

  async getUser(req: Request, res: Response) {
    const { idUser } = req.params;

    const user: User = await UserService.getUser(idUser);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  }

  async addUser(req: Request, res: Response) {
    try {
      const user: User = await UserService.addUser(req.body);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message.includes('duplicate')) return res.status(422).json({ error: 'User already exists' });
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { idUser } = req.params;

    const result = await UserService.deleteUser(idUser);
    if (!result.status) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({
      id: result.id,
      message: 'User deleted',
    });
  }
}

export default new UserController();