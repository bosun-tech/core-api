import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Bosun API')
    .setDescription('API documentation for anchor\'s wrapper')
    .setVersion('1.0')
    .addTag('Bosun API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
