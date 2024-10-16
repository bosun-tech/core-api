import { BadRequestException } from '@nestjs/common';

class UserNotFound extends BadRequestException {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export const userException = {
  USER_NOT_FOUND: new UserNotFound('User not found'),
};
