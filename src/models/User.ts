import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserConsent } from '@models/UserConsent';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
	id?: string;

  @Column('varchar', {
    unique: true,
  })
  email?: string;

  @OneToMany(() => UserConsent, (userConsent) => userConsent.user, { onDelete: 'CASCADE' })
  consents?: UserConsent[];
}