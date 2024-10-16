import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserRepository', () => {
  let repository: Repository<UserEntity>;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: Repository,
        },
      ],
    }).compile();

    repository = module.get(getRepositoryToken(UserEntity));
    userRepository = module.get(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUserDomain = {
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
  };

  const mockUserEntity = {
    ...mockUserDomain,
    id: 1,
  };

  describe('create', () => {
    it('should create a new user', async () => {
      repository.create = jest.fn().mockReturnValue(mockUserDomain);
      repository.save = jest.fn().mockResolvedValue(mockUserEntity);

      const result = await userRepository.create(mockUserDomain);

      expect(result).toEqual(mockUserEntity);
      expect(repository.create).toHaveBeenCalledWith(mockUserDomain);
      expect(repository.save).toHaveBeenCalledWith(mockUserDomain);
    });

    it('should throw an error if the user already exists', async () => {
      repository.create = jest.fn().mockReturnValue(mockUserDomain);
      repository.save = jest
        .fn()
        .mockRejectedValue(new Error('User already exists'));

      await expect(userRepository.create(mockUserDomain)).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      repository.find = jest.fn().mockResolvedValue([mockUserEntity]);

      const result = await userRepository.findAll();

      expect(result).toEqual([mockUserEntity]);
    });

    it('should throw an error if the users cannot be found', async () => {
      repository.find = jest
        .fn()
        .mockRejectedValue(new Error('Users not found'));

      await expect(userRepository.findAll()).rejects.toThrow('Users not found');
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      repository.findOneBy = jest.fn().mockResolvedValue(mockUserEntity);

      const result = await userRepository.findOne(1);

      expect(result).toEqual(mockUserEntity);
    });

    it('should throw an error if the user cannot be found', async () => {
      repository.findOneBy = jest
        .fn()
        .mockRejectedValue(new Error('User not found'));

      await expect(userRepository.findOne(1)).rejects.toThrow('User not found');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      repository.delete = jest.fn().mockResolvedValue({});

      await userRepository.remove(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the user cannot be removed', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValue(new Error('User not found'));

      await expect(userRepository.remove(1)).rejects.toThrow('User not found');
    });
  });
});
