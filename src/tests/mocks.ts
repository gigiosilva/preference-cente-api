import { User } from '@models/User';
import { UserConsent } from '@models/UserConsent';
import { Consent, ConsentType } from '@models/Consent';
import { EventData } from '@models/EventData';
import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { Event } from '@models/Event';

MockDate.set('2021-08-28');

export const userMock: User = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'giovani.m.silva@gmail.com',
  consents: [
    {
      id: ConsentType.EMAIL,
      enabled: true,
    },
  ],
};

export const newUserMock: User = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'giovani.m.silva@gmail.com',
  consents: [],
};

export const usersMock: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    email: 'giovani.m.silva@gmail.com',
  },
  {
    id: '00000000-0000-0000-0000-000000000000',
    email: 'giovani.m.silva@gmail.com',
  },
];

export const consentMock: Consent = {
  id: ConsentType.SMS,
  enabled: false,
};

export const userConsentMock: UserConsent = {
  id: ConsentType.SMS,
  idUser: userMock.id,
  enabled: false,
};

export const eventDataMock: EventData = {
  user: {
    id: '00000000-0000-0000-0000-000000000000',
  },
  consents: [
    {
      id: ConsentType.EMAIL,
      enabled: true,
    },
    {
      id: ConsentType.SMS,
      enabled: false,
    },
  ],
};

export const eventMock: Event = {
  idUser: '00000000-0000-0000-0000-000000000000',
  data: eventDataMock,
  date: dayjs().toDate(),
};