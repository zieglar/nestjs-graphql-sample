import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { ConfigModuleOptions } from '../modules/config/interfaces/config-options.interface';

@Injectable()
export class ConfigModuleConfig
  implements ModuleConfigFactory<ConfigModuleOptions> {
  constructor() {}

  createModuleConfig(): ConfigModuleOptions {
    return {
      useProcess: true,
    };
  }
}
