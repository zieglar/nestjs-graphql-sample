import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class GraphQLModuleConfig implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    const isProd = this.config.isProd();
    return {
      playground: !isProd,
      debug: !isProd,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    };
  }
}
