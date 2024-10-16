import { BaseEntity } from '../../../common/infrastructure/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
