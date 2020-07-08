import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '../modules/config/config.service';

@Injectable()
export class JwtModuleConfig implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.getJwtSecretKey(),
      signOptions: {
        expiresIn: this.config.getJwtExpiresIn(),
      },
    };
  }
}
