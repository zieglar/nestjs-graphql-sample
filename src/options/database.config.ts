import { Injectable } from '@nestjs/common';
import { ConfigService } from '../modules/config/config.service';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseModuleConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.config.getTypeOrmConfig();
  }
}
