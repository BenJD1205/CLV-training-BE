import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({cmd:'get-profile'})
    async getProfile(@Payload() userId){
        return this.userService.getProfile(userId);
    }
}
