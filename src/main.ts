import { buildApp, configureApp } from './app-init';
import { ConfigService } from './modules/config/config.service';
import { OgmaService } from '@ogma/nestjs-module';

async function bootstrap() {
  const app = await buildApp();
  const config = app.get<ConfigService>(ConfigService);
  const logger = await app.get<OgmaService>(OgmaService);
  await configureApp(app, config, logger);
  const port = config.getPort();
  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();

  logger.log(`Listening at ${url}`, 'NestApplication');
}

bootstrap();
