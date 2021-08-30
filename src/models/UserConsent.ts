import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from '@models/User';
import { ConsentType } from '@models/Consent';

@Entity({ name: 'user_consents' })
export class UserConsent {
  @PrimaryColumn({
    type: 'enum',
    enum: ConsentType,
  })
  id: ConsentType;

  @PrimaryColumn('int', {
    name: 'id_user',
  })
  idUser?: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id_user' })
  user?: User;

  @Column('bool')
  enabled: boolean;
}