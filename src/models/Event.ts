import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '@models/User';
import { EventData } from '@models/EventData';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
	id?: string;

  @Column('int', {
    nullable: true,
    name: 'id_user',
  })
  idUser: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_user' })
  user?: User;

  @Column('jsonb')
  data: EventData;

  @Column('timestamptz', {
    name: 'created_at',
  })
	date: Date;
}