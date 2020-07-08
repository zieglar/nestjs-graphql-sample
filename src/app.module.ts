import {CacheModule, ClassSerializerInterceptor, Module,} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModuleConfig, DatabaseModuleConfig, GraphQLModuleConfig, OgmaModuleConfig,} from 'src/options';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {GraphQLModule} from '@nestjs/graphql';
import {ScheduleModule} from '@nestjs/schedule';
import {AppResolver} from 'src/app.resolver';
import {RedisModule} from 'nestjs-redis';
import {ConfigService} from 'src/modules/config/config.service';
import {ConfigModule} from 'src/modules/config/config.module';
import {ClientModule} from 'src/modules/client/client.module';
import {OgmaModule} from '@ogma/nestjs-module';
import {HealthModule} from 'src/modules/health/health.module';
import {ConsoleModule} from 'nestjs-console';

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, {
      useClass: ConfigModuleConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: DatabaseModuleConfig,
    }),
    OgmaModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: OgmaModuleConfig,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: GraphQLModuleConfig,
    }),
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) => config.getRedisConfig(),
      inject: [ConfigService],
      imports: [ConfigModule.Deferred],
    }),
    CacheModule.registerAsync({
      useFactory: (config: ConfigService) => config.getCacheStoreConfig(),
      inject: [ConfigService],
      imports: [ConfigModule.Deferred],
    }),
    ConsoleModule,
    HealthModule,
    ScheduleModule.forRoot(),
    ClientModule
  ],
  providers: [
    AppService,
    AppResolver,
    {provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor},
  ],
})
export class AppModule {
}
