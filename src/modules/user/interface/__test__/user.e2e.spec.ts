import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { join } from 'path';
import { loadFixtures } from '../../../../../data/utils/fixtures-loader.util';
import { AppModule } from '../../../../app.module';

describe('User - [/user]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const dataSourcePath = join(
      __dirname,
      '../../../../configuration/database/orm/data-source.configuration.ts',
    );

    console.log(dataSourcePath);
    await loadFixtures(`${__dirname}/fixture`, dataSourcePath)
      .then(() => {
        console.log('Fixtures are successfully loaded.');
      })
      .catch((err: unknown) => {
        console.log('Error loading fixtures:', err);
      });

    app = moduleRef.createNestApplication();

    await app.init();
  });

  describe('Get User - [GET /user/:id]', () => {
    it('should return a user', async () => {
      const mockUserId = 1;

      const response = await request(app.getHttpServer())
        .get(`/user/${mockUserId}`)
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({
        id: mockUserId,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
      });
    });

    it('should throw an error if it fails to find a user', async () => {
      const mockUserId = 3;

      await request(app.getHttpServer())
        .get(`/user/${mockUserId}`)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
