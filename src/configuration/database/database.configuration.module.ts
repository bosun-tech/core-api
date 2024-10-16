import { Module } from '@nestjs/common';
import { ConnectionOptionsFactory } from './orm/orm.configuration';

@Module({
  providers: [ConnectionOptionsFactory],
  exports: [ConnectionOptionsFactory],
})
export class DatabaseConfigurationModule {}
