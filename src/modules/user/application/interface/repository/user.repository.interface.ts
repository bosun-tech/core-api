import { UserDomain } from '@/modules/user/domain/user.domain';
import { UserEntity } from '@/modules/user/infrastructure/entities/user.entity';

export interface IUserRepository {
  create(user: UserDomain): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: number): Promise<UserEntity | null>;
  remove(id: number): Promise<void>;
}
