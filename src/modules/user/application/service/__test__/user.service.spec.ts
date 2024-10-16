import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../user.service';
import { IUserDto } from '../../interface/dto/response/user.dto.interface';

describe('UserService', () => {
  let userService: UserService;
  const userRepositoryMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockCreateUserDto = {
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
  };

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
      userRepositoryMock.create.mockResolvedValue(mockUsersDto[0]);

      const result = await userService.create(mockCreateUserDto);

      expect(result).toEqual(mockUsersDto[0]);
      expect(userRepositoryMock.create).toHaveBeenCalled();
    });

    it('should throw an error if user creation fails', async () => {
      const errorMock = new Error('User creation failed');
      userRepositoryMock.create.mockRejectedValue(errorMock);

      await expect(userService.create(mockCreateUserDto)).rejects.toThrow(
        errorMock,
      );
    });

    describe('findAll()', () => {
      it('should return an array of users', async () => {
        userRepositoryMock.findAll.mockResolvedValue(mockUsersDto);

        const result = await userService.findAll();

        expect(result).toEqual(mockUsersDto);
        expect(userRepositoryMock.findAll).toHaveBeenCalled();
      });

      it('should throw an error if user retrieval fails', async () => {
        const errorMock = new Error('User retrieval failed');
        userRepositoryMock.findAll.mockRejectedValue(errorMock);

        await expect(userService.findAll()).rejects.toThrow(errorMock);
        expect(userRepositoryMock.findAll).toHaveBeenCalled();
      });
    });

    describe('findOne()', () => {
      it('should return a user', async () => {
        userRepositoryMock.findOne.mockResolvedValue(mockUsersDto[0]);

        const result = await userService.findOne(1);

        expect(result).toEqual(mockUsersDto[0]);
        expect(userRepositoryMock.findOne).toHaveBeenCalledWith(1);
      });

      it('should throw an error if user retrieval fails', async () => {
        const errorMock = new Error('User retrieval failed');
        userRepositoryMock.findOne.mockRejectedValue(errorMock);

        await expect(userService.findOne(1)).rejects.toThrow(errorMock);
        expect(userRepositoryMock.findOne).toHaveBeenCalledWith(1);
      });
    });

    describe('remove()', () => {
      it('should remove a user', async () => {
        userRepositoryMock.remove.mockResolvedValue(undefined);

        await userService.remove(1);

        expect(userRepositoryMock.remove).toHaveBeenCalledWith(1);
      });

      it('should throw an error if user removal fails', async () => {
        const errorMock = new Error('User removal failed');
        userRepositoryMock.remove.mockRejectedValue(errorMock);

        await expect(userService.remove(1)).rejects.toThrow(errorMock);
        expect(userRepositoryMock.remove).toHaveBeenCalledWith(1);
      });
    });
  });
});
