import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './configuration/openAPI/swagger.configuration';
import { sentryConfig } from './configuration/sentry/sentry.configuration';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeConfig } from './configuration/pipe/validation-pipe.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  sentryConfig(app, configService);

  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));
  swaggerConfig(app);

  await app.listen(configService.get('server.port'));
}
bootstrap();
