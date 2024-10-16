import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import connectionOptions from '../src/configuration/database/orm/orm.configuration';
import { UserModule } from './modules/user/user.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import environmentConfiguration from '../src/configuration/environment.configuration';
import { envVarsSchema } from '../src/validation/joi.validation';
import { DatabaseConfigurationModule } from '../src/configuration/database/database.configuration.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    DatabaseConfigurationModule,
    ConfigModule.forRoot({
      load: [environmentConfiguration],
      validationSchema: envVarsSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigurationModule],
      useFactory: () => ({
        ...connectionOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        try {
          return await new DataSource(options).initialize();
        } catch (error) {
          console.error('Error during data source initialization:', error);
          throw error;
        }
      },
    }),
    CommonModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
