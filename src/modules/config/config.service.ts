import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { parse } from 'dotenv';
import { join } from 'path';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { EnvRunType, EnvSchema } from './env.schema';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { readFileSync, writeJSONSync } from 'fs-extra';
import * as ioRedisStore from 'cache-manager-ioredis';
import { Command, Console, createSpinner } from 'nestjs-console';

interface RsmsMgrConfig {
  hostName: string;
  address: string;
}

interface LocalConfig {
  url: string;
}

interface GlobalConfig {
  ip: string;
}

@Injectable()
@Console()
export class ConfigService implements OnModuleInit {
  private envConfig: EnvRunType;
  private rootPath: string;

  constructor(@Inject(CONFIG_MODULE_OPTIONS) options: ConfigModuleOptions) {
    if (!options.useProcess && !options.fileName) {
      throw new Error(
        'Missing configuration options.' +
          ' If using process.env variables, please mark useProcess as "true".' +
          ' Otherwise, please provide and env file.',
      );
    }
    let config: { [key: string]: any };
    if (options.fileName) {
      config = parse(readFileSync(join(process.env.PWD, options.fileName)));
    } else {
      config = process.env;
    }
    try {
      this.envConfig = ConfigService.validateConfig(config);
    } catch (e) {
      console.error('配置文件验证失败，请检查');
      console.error(e);
      process.exit();
    }
  }

  private static validateConfig(config): EnvRunType {
    const { error, value: envVars } = EnvSchema.validate(config, {
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(error.message);
    }
    return envVars;
  }

  getProjectInfo() {
    return require(join(process.env.PWD, 'package.json'));
  }

  onModuleInit(): any {
    this.buildTypeOrmConfigFile(false);
  }

  @Command({
    command: 'build:ormconfig',
    description: 'Build TYPEORM Config File from ENV',
  })
  buildTypeOrmConfigFile(fromConsole: boolean = true) {
    const spin = createSpinner();
    if (fromConsole) {
      spin.start();
      spin.info('Start write TYPEORM env to ormconfig file');
    }
    if (!this.isProd() && this.getUseDataBase()) {
      writeJSONSync(
        join(process.env.PWD, 'ormconfig.json'),
        this.getTypeOrmConfig(),
      );
      if (fromConsole) spin.succeed('Write ormconfig file success');
    } else {
      if (fromConsole) spin.fail("Application don't need ormconfig file");
    }
  }

  getUseDataBase() {
    return this.envConfig.USE_DATABASE;
  }

  getTypeOrmConfig(): PostgresConnectionOptions | MysqlConnectionOptions {
    const runDir = __dirname.includes('/src/') ? 'src' : 'dist';
    return {
      type: this.envConfig.DATABASE_TYPE,
      host: this.envConfig.DATABASE_HOST,
      port: Number.parseInt(this.envConfig.DATABASE_PORT, 10),
      username: this.envConfig.DATABASE_USERNAME,
      password: this.envConfig.DATABASE_PASSWORD,
      database: this.envConfig.DATABASE_NAME,
      entities: [`${runDir}/entities/*.entity{.ts,.js}`],
      subscribers: [`${runDir}/subscribers/*.subscriber{.ts,.js}`],
      logging: this.isProd() ? false : ['error'],
      synchronize: false,
      migrationsRun: false,
      cli: {
        entitiesDir: 'src/entities',
        subscribersDir: 'src/subscribers',
      },
    };
  }

  getCacheStoreConfig() {
    return {
      store: ioRedisStore,
      ...this.getRedisConfig(),
    };
  }

  getRedisConfig() {
    return {
      host: this.envConfig.REDIS_HOST,
      password: this.envConfig.REDIS_AUTH,
      port: this.envConfig.REDIS_PORT,
      db: this.envConfig.REDIS_DB,
      ttl: Number.parseInt(this.envConfig.REDIS_TTL, 10),
    };
  }

  isProd(): boolean {
    const env = this.getNodeEnv().toLowerCase();
    return env === 'production' || env === 'prod';
  }

  getNodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  getRateLimit(): number {
    return Number.parseInt(this.envConfig.RATE_LIMIT, 10);
  }

  getPageLimit(): number {
    return Number.parseInt(this.envConfig.PAGE_LIMIT, 10);
  }

  getSessionSecret(): string {
    return this.envConfig.SESSION_SECRET;
  }

  getJwtSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }

  getJwtExpiresIn(): string {
    return this.envConfig.JWT_EXPIRES_IN;
  }

  getGlobalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  getPort(): number {
    return Number.parseInt(this.envConfig.PORT, 10);
  }

  getLogLevel() {
    return this.envConfig.LOG_LEVEL;
  }

  getCookieAge(): number {
    return Number.parseInt(this.envConfig.COOKIE_AGE, 10) * 1000;
  }

  getLoggerConfig() {
    return {
      logPath: join(this.rootPath, 'logs'),
      logLevel: this.envConfig.LOG_LEVEL,
    };
  }

  getQRCodeConfig() {
    return {
      path: join(this.rootPath, 'qrcode'),
      user: this.envConfig.STATIC_FILE_USER,
      group: this.envConfig.STATIC_FILE_GROUP,
      size: this.envConfig.QRCODE_SIZE,
    };
  }

  getUseHttps() {
    return this.envConfig.USE_HTTPS;
  }

  getWeChatConfig() {
    return {
      appId: this.envConfig.WECHAT_APP_ID,
      appSecret: this.envConfig.WECHAT_APP_SECRET,
      mchId: this.envConfig.WECHAT_MCH_ID,
      accessTokenExpiresIn: this.envConfig.WECHAT_ACCESS_TOKEN_EXPIRES_IN,
      payApiKey: this.envConfig.WECHAT_PAY_API_KEY,
    };
  }

  getRsmsMgrConfig(): RsmsMgrConfig {
    return {
      hostName: this.envConfig.RSMS_MGR_HOST,
      address: this.envConfig.RSMS_MGR_ADDRESS,
    };
  }

  getLocalConfig(): LocalConfig {
    let url = '';
    if (this.envConfig.LOCAL_IP !== '') {
      url = `http://${this.envConfig.LOCAL_IP}:${this.envConfig.PORT}`;
    }
    return { url };
  }

  getGlobalConfig(): GlobalConfig {
    return {
      ip: this.envConfig.GLOBAL_IP,
    };
  }
}
