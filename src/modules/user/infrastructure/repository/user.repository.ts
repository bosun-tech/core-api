import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDomain } from '../../domain/user.domain';
import { IUserRepository } from '../../application/interface/repository/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDomain): Promise<UserEntity> {
    try {
      const userCreated = this.userRepository.create(user);

      return await this.userRepository.save(userCreated);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
