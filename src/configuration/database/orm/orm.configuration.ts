import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions';
import { ENVIRONMENT } from '../../enum/environment.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import environmentConfiguration from '../../environment.configuration';

@Injectable()
export class ConnectionOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    this.configService = new ConfigService(environmentConfiguration());
  }

  private createBaseOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
    };
  }

  private createProductionOptions(): DataSourceOptions {
    const baseOptions = this.createBaseOptions();
    return {
      ...baseOptions,
      synchronize: true,
    };
  }

  private createStagingOptions(): DataSourceOptions {
    return this.createBaseOptions();
  }

  private createDevelopmentOptions(): DataSourceOptions {
    const baseOptions = this.createBaseOptions();
    return {
      ...baseOptions,
      synchronize: true,
    };
  }

  private createTestOptions(): BetterSqlite3ConnectionOptions {
    return {
      type: 'better-sqlite3',
      database: `./data/tests/tests.${Math.random()}.db`,
      synchronize: true,
      dropSchema: false,
      readonly: false,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  getConnectionOptions(): DataSourceOptions {
    const env = this.configService.get<string>('server.nodeEnvironment');

    switch (env) {
      case ENVIRONMENT.PRODUCTION:
        return this.createProductionOptions();
      case ENVIRONMENT.STAGING:
        return this.createStagingOptions();
      case ENVIRONMENT.DEVELOPMENT:
        return this.createDevelopmentOptions();
      case ENVIRONMENT.AUTOMATED_TEST:
      case ENVIRONMENT.TEST:
        return this.createTestOptions();
      default:
        throw new Error('No environment defined');
    }
  }
}

const configService = new ConfigService(environmentConfiguration());
const connectionOptionsFactory = new ConnectionOptionsFactory(configService);

const connectionOptions = connectionOptionsFactory.getConnectionOptions();

export default connectionOptions;
