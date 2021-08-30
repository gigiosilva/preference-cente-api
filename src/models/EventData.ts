import { User } from '@models/User';
import { Consent } from '@models/Consent';

export class EventData {
  user: User;
	consents: Consent[];
}