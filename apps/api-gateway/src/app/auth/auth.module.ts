import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports:[ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide:'USER_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: configService.get('USER_PORT'),
            host: configService.get('USER_HOST'),
          },
        })
      },
      inject: [ConfigService],
    },
  ]
})
export class AuthModule {}
