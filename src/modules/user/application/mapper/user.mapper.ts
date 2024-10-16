import { UserEntity } from '../../infrastructure/entities/user.entity';
import { IUserDto } from '../interface/dto/response/user.dto.interface';

export const mapUserEntityToUserDto = ({
  id,
  firstName,
  lastName,
  isActive,
}: UserEntity): IUserDto => {
  return {
    id,
    firstName,
    lastName,
    isActive,
  };
};
