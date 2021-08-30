import { getRepository, Repository } from 'typeorm';
import { Event } from '@models/Event';
import dayjs from 'dayjs';
import UserConsentService from '@services/UserConsentService';
import { EventData } from '@models/EventData';

class EventService {
  async addEvent(event: EventData) {
    const eventRepository: Repository<Event> = getRepository(Event);

    return eventRepository.save({
      idUser: event.user.id,
      data: event,
      date: dayjs().toDate(),
    });
  }

  propagateEvent(event: EventData) {
    UserConsentService.setConsentByEvent(event);
  }
}

export default new EventService();