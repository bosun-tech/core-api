import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUserDto } from '../../application/interface/dto/request/create-user.dto.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
