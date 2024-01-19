import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto,LoginUserDto } from '@server/shared/dto';
import {AuthMessage} from '@server/shared/message'
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern({cmd:AuthMessage.REGISTER})
    async register(@Payload() createUserDto: RegisterUserDto){
        return this.authService.register(createUserDto);
    }

    @MessagePattern({cmd: AuthMessage.LOGIN})
    async login (@Payload() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @MessagePattern({ cmd: 'verify-jwt' })
    @UseGuards(JwtGuard)
    async verifyJwt(
        @Payload() payload: { jwt: string },
    ) {
        return this.authService.verifyJwt(payload.jwt);
    }
}
