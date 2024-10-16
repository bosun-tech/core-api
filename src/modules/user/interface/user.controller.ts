import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../application/service/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserDto } from '../application/interface/dto/response/user.dto.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<IUserDto> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<IUserDto[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUserDto | null> {
    try {
      return await this.userService.findOne(+id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.userService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
