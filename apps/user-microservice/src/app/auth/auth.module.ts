import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import ms from 'ms';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from '@server/shared/schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    //    JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: {
    //       expiresIn: ms(configService.get<string>('JWT_EXPIRATION')) / 1000,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
