import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from '@server/shared/schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService,UserRepository]
})
export class UserModule {}
