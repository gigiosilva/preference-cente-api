import { mock } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';

export const repositoryMock = mock<Repository<any>>();
export const querybuilderMock = mock<SelectQueryBuilder<any>>();

export const getConnection = jest.fn().mockReturnValue({
  getRepository: () => repositoryMock,
});

export const getRepository = jest.fn().mockReturnValue(repositoryMock);

export class BaseEntity {}
export const ObjectIdColumn = () => {};
export const Column = () => {};
export const Index = () => {};
export const CreateDateColumn = () => {};
export const UpdateDateColumn = () => {};
export const Entity = () => {};
export const PrimaryColumn = () => {};
export const JoinColumn = () => {};
export const OneToMany = () => {};
export const ManyToOne = () => {};
export const PrimaryGeneratedColumn = () => {};