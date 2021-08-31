import { mock } from 'jest-mock-extended';
import supertest from 'supertest';
import typeorm, { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { userMock, usersMock } from '@tests/mocks';
import UserService from '@services/UserService';
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

describe('** USER ROUTE **', () => {
  describe('GET /users', () => {
    it('should return all users', async () => {
      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.getMany.mockResolvedValue(usersMock);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app).get('/api/users').expect(200, usersMock);
    });

    it('should return general error', async () => {
      UserService.getUsers = jest.fn().mockImplementation(() => {
        throw new Error();
      });

      await supertest(Server.app)
        .get('/api/users')
        .send(userMock)
        .expect(500, {
          error: '',
        });
    });
  });

  describe('POST /users', () => {
    it('should create an user and return it', async () => {
      repositoryMock.save.mockResolvedValue(userMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/users')
        .send(userMock)
        .expect(200, userMock);
    });

    it('should fail by invalid email', async () => {
      repositoryMock.save.mockResolvedValue(userMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/users')
        .send({ ...userMock, email: 'invalid email' })
        .expect(422, {
          error: '"email" must be a valid email',
        });
    });

    it('should fail by duplicated user', async () => {
      repositoryMock.save.mockImplementation(() => {
        throw new Error('duplicated');
      });
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/users')
        .send(userMock)
        .expect(422, {
          error: 'User already exists',
        });
    });

    it('should fail by internal server error', async () => {
      repositoryMock.save.mockImplementation(() => {
        throw new Error();
      });
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .post('/api/users')
        .send(userMock)
        .expect(500, {
          error: 'Internal server error',
        });
    });
  });

  describe('GET /users/:idUser', () => {
    it('should return one user', async () => {
      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.where.mockReturnThis();
      querybuilderMock.getOne.mockResolvedValue(userMock);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .get(`/api/users/${userMock.id}`)
        .expect(200, userMock);
    });

    it('should fail by user not found', async () => {
      querybuilderMock.select.mockReturnThis();
      querybuilderMock.leftJoin.mockReturnThis();
      querybuilderMock.where.mockReturnThis();
      querybuilderMock.getOne.mockResolvedValue(null);

      repositoryMock.createQueryBuilder.mockReturnValue(querybuilderMock);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .get(`/api/users/${userMock.id}`)
        .expect(404, {
          error: 'User not found',
        });
    });

    it('should fail by uuid validation', async () => {
      UserService.getUser = jest.fn().mockReturnValue({
        status: false,
      });

      await supertest(Server.app)
        .get('/api/users/1')
        .expect(422, {
          error: '"idUser" must be a valid GUID',
        });
    });
  });

  describe('DELETE /users/:idUser', () => {
    it('should delete an user by its ID', async () => {
      const deleteResolve: DeleteResult = {
        affected: 1,
        raw: [],
      };

      const response = {
        id: userMock.id,
        message: 'User deleted',
      };

      repositoryMock.delete.mockResolvedValue(deleteResolve);
      typeorm.getRepository = jest.fn().mockReturnValue(repositoryMock);

      await supertest(Server.app)
        .delete(`/api/users/${userMock.id}`)
        .expect(200, response);
    });

    it('should fail by user not found', async () => {
      UserService.deleteUser = jest.fn().mockReturnValue({
        status: false,
      });

      await supertest(Server.app)
        .delete(`/api/users/${userMock.id}`)
        .expect(404, {
          error: 'User not found',
        });
    });

    it('should fail by uuid validation', async () => {
      UserService.deleteUser = jest.fn().mockReturnValue({
        status: false,
      });

      await supertest(Server.app)
        .delete('/api/users/1')
        .expect(422, {
          error: '"idUser" must be a valid GUID',
        });
    });
  });
});