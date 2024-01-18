import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports:[ConfigModule],
  controllers: [UserController],
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
    }
  ]
})
export class UserModule {}
