import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto,LoginUserDto } from '@server/shared/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({cmd:'register'})
    async register(@Payload() createUserDto: RegisterUserDto){
        return this.authService.register(createUserDto);
    }

    @MessagePattern({cmd:'login'})
    async login (@Payload() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @MessagePattern({cmd:'get-all-user'})
    async getAllUser(){
        console.log('Hello users')
    }
}
