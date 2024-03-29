import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TransformInterceptor } from './core/interceptors';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  const configService = app.get(ConfigService);

  await app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: configService.get('PORT'),
    },
  });
  await app.startAllMicroservices()
}

bootstrap();
