import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientService} from 'src/modules/client/client.service';
import {ClientResolver} from 'src/modules/client/client.resolver';
import {Module} from '@nestjs/common';
import {ClientEntity} from '@entities/client.entity';
import {ClientController} from './client.controller';
import {BullModule} from '@nestjs/bull';
import {OgmaModule} from '@ogma/nestjs-module';
import {ConfigModule} from "src/modules/config/config.module";
import {ConfigService} from "src/modules/config/config.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    OgmaModule.forFeature(ClientModule.name),
    BullModule.registerQueueAsync({
      name: 'client',
      imports: [ConfigModule.Deferred],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        redis: config.getRedisConfig(),
      }),
    }),
    ConfigModule.Deferred,
  ],
  providers: [ClientService, ClientResolver],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {
}
