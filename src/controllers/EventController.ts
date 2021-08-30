import { Request, Response } from 'express';
import EventService from '@services/EventService';
import UserService from '@services/UserService';
import { Event } from '@models/Event';
import { User } from '@models/User';

class EventController {
  async addEvent(req: Request, res: Response) {
    const { user } = req.body;

    const foundUser: User = await UserService.getUser(user.id);
    if (!foundUser) return res.status(404).json({ error: 'User not found' });

    EventService.propagateEvent(req.body);

    const event: Event = await EventService.addEvent(req.body);
    return res.status(200).json(event);
  }
}

export default new EventController();