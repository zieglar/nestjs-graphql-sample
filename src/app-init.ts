import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from 'src/modules/config/config.service';
import { OgmaService } from '@ogma/nestjs-module';

require('dotenv').config();

export async function buildApp(): Promise<INestApplication> {
  const fAdapt = new FastifyAdapter();
  fAdapt.register(require('fastify-helmet'));
  fAdapt.register(require('fastify-compress'));
  fAdapt.register(require('fastify-no-icon'));
  fAdapt.register(require('fastify-rate-limit'));
  fAdapt.getInstance().addContentTypeParser('*', function (req, done) {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      done(null, data);
    });
  });

  return await NestFactory.create<NestFastifyApplication>(AppModule, fAdapt);
}

export async function configureApp(
  app: INestApplication,
  config: ConfigService,
  logger: OgmaService,
) {
  app.useLogger(logger);
  app.setGlobalPrefix(config.getGlobalPrefix());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  logger.log('Application Configuration complete', 'ApplicationConfig');
}
