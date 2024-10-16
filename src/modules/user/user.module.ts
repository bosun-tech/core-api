import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserService } from './application/service/user.service';
import { UserController } from './interface/user.controller';

import { USER_REPOSITORY } from './application/interface/repository/user.repository.constant';
import { UserRepository } from './infrastructure/repository/user.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CommonModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
