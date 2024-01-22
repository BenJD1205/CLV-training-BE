import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  await app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('KAFKA_PORT')],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  });
  await app.startAllMicroservices()
}

bootstrap();
