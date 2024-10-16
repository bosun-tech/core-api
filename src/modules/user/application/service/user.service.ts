import { Inject, Injectable } from '@nestjs/common';
import { ICreateUserDto } from '../interface/dto/request/create-user.dto.interface';
import { IUserDto } from '../interface/dto/response/user.dto.interface';
import { IUserRepository } from '../interface/repository/user.repository.interface';
import { USER_REPOSITORY } from '../interface/repository/user.repository.constant';
import { mapUserEntityToUserDto } from '../mapper/user.mapper';
import { userException } from '../exception/user.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  async create(user: ICreateUserDto): Promise<IUserDto> {
    try {
      const userCreated = await this.userRepository.create(user);

      return mapUserEntityToUserDto(userCreated);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IUserDto[]> {
    try {
      const users = await this.userRepository.findAll();

      return users.map((user) => mapUserEntityToUserDto(user));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<IUserDto | null> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) throw userException.USER_NOT_FOUND;

      return mapUserEntityToUserDto(user);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.userRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
