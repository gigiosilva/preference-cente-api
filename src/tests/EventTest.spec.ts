import { mock } from 'jest-mock-extended';
import supertest from 'supertest';
import typeorm, { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { consentMock, eventDataMock, eventMock, userConsentMock, userMock } from '@tests/mocks';
import { ConsentType } from '@models/Consent';
import UserService from '@services/UserService';
import UserConsentService from '@services/UserConsentService';
import { UserConsent } from '@models/UserConsent';
import Server from '../server';

const repositoryMock = mock<Repository<any>>();
const querybuilderMock = mock<SelectQueryBuilder<any>>();

jest.mock('typeorm', () => ({
  createConnection: () => {},
  getRepository: () => repositoryMock,
  BaseEntity: class Mock {},
  ObjectType: () => {},
  Entity: () => {},
  InputType: () => {},
  Index: () => {},
  PrimaryGeneratedColumn: () => {},
  PrimaryColumn: () => {},
  JoinColumn: () => {},
  Column: () => {},
  CreateDateColumn: () => {},
  UpdateDateColumn: () => {},
  OneToMany: () => {},
  ManyToOne: () => {},
}));

export const getConnection = jest.fn().mockReturnValue({
  getRepository: () => repositoryMock,
});

describe('** EVENT ROUTES **', () => {
  describe('POST /events', () => {
    it('should add event and create consents', async () => {
      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.where.mockReturnThis();
      querybuilderMock.getOne.mockResolvedValue(userMock);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      repositoryMock.save.mockResolvedValue(eventMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      const response = await supertest(Server.app)
        .post('/api/events')
        .send(eventDataMock)
        .expect(200);

      expect(response.body).toMatchObject({
        idUser: '00000000-0000-0000-0000-000000000000',
        data: eventDataMock,
      });
    });

    it('should update an user consent', async () => {
      const updateResult: UpdateResult = {
        affected: 1,
        raw: [],
        generatedMaps: [],
      };

      repositoryMock.findOne.mockResolvedValue(userConsentMock);
      repositoryMock.save.mockResolvedValue(null);
      repositoryMock.update.mockResolvedValue(updateResult);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      const result = await UserConsentService.updateUserConsent(userMock.id, consentMock);

      expect(result).toEqual({
        status: 'updated',
        userConsent: {
          ...userConsentMock,
          ...consentMock,
        },
      });

      expect(typeorm.getRepository).toHaveBeenNthCalledWith(1, UserConsent);
      expect(typeorm.getRepository(UserConsent).findOne).toHaveBeenNthCalledWith(1, {
        id: consentMock.id,
        idUser: userMock.id,
      });
      expect(typeorm.getRepository(UserConsent).save).toHaveBeenCalledTimes(0);
      expect(typeorm.getRepository(UserConsent).update).toHaveBeenCalledTimes(1);
    });

    it('should return error missing consents', async () => {
      const eventDataBroken: any = {
        user: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      };

      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.where.mockReturnThis();
      querybuilderMock.getOne.mockResolvedValue(userMock);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      repositoryMock.save.mockResolvedValue(eventMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/events')
        .send(eventDataBroken)
        .expect(422, {
          error: '"consents" is required',
        });
    });

    it('should return error missing user', async () => {
      const eventDataBroken: any = {
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

      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.where.mockReturnThis();
      querybuilderMock.getOne.mockResolvedValue(userMock);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      repositoryMock.save.mockResolvedValue(eventMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/events')
        .send(eventDataBroken)
        .expect(422, {
          error: '"user" is required',
        });
    });

    it('should return error user not found', async () => {
      UserService.getUser = jest.fn().mockResolvedValue(null);

      await supertest(Server.app)
        .post('/api/events')
        .send(eventDataMock)
        .expect(404, {
          error: 'User not found',
        });
    });
  });
});