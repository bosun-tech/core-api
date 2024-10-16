import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../../application/service/user.service';
import { IUserDto } from '../../application/interface/dto/response/user.dto.interface';

describe('UserController', () => {
  let userController: UserController;
  const userServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUsersDto: IUserDto[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Titor',
      isActive: true,
    },
    {
      id: 2,
      firstName: 'Jeffrey',
      lastName: 'Lebowsky',
      isActive: true,
    },
  ];

  describe('create()', () => {
    it('should create a new user', async () => {
      userServiceMock.create = jest.fn().mockResolvedValue(mockUsersDto[0]);

      const response = await userController.create({
        firstName: 'John',
        lastName: 'Titor',
        isActive: true,
      });

      expect(response).toEqual(mockUsersDto[0]);
    });
  });

  describe('findAll()', () => {
    it('should find all users', async () => {
      userServiceMock.findAll = jest.fn().mockResolvedValue(mockUsersDto);

      const response = await userController.findAll();

      expect(response).toEqual(mockUsersDto);
    });

    it('should throw an error if it fails to find all users', async () => {
      userServiceMock.findAll = jest.fn().mockRejectedValue(new Error());

      await expect(userController.findAll()).rejects.toThrow();
    });
  });

  describe('findOne()', () => {
    it('should return a user by id', async () => {
      userServiceMock.findOne = jest.fn().mockResolvedValue(mockUsersDto[0]);

      const response = await userController.findOne('1');

      expect(response).toEqual(mockUsersDto[0]);
    });

    it('should throw an error if it fails to find a user by id', async () => {
      userServiceMock.findOne = jest.fn().mockRejectedValue(new Error());

      await expect(userController.findOne('1')).rejects.toThrow();
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      userServiceMock.remove = jest.fn();

      const response = await userController.remove(1);

      expect(response).toBeUndefined();
    });

    it('should throw an error if it fails to remove a user', async () => {
      userServiceMock.remove = jest.fn().mockRejectedValue(new Error());

      await expect(userController.remove(1)).rejects.toThrow();
    });
  });
});
