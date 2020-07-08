import { FastifyParser } from '@ogma/platform-fastify';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { OgmaModuleOptions } from '@ogma/nestjs-module';
import { ConfigService } from '../modules/config/config.service';
import { Injectable } from '@nestjs/common';
import { GraphQLFastifyParser } from '@ogma/platform-graphql-fastify';

@Injectable()
export class OgmaModuleConfig
  implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    let projectName = this.configService.getProjectInfo().name;
    projectName =
      projectName.indexOf('-') > -1 ? projectName.split('-')[0] : projectName;

    return {
      service: {
        // returns one of Ogma's log levels, or 'ALL'.
        logLevel: this.configService.getLogLevel(),
        color: true,
        // could be something like 'MyAwesomeNestApp'
        application: projectName.toUpperCase(),
      },
      interceptor: {
        http: FastifyParser,
        gql: GraphQLFastifyParser,
      },
    };
  }
}
