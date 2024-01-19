
import { RegisterUserDto,LoginUserDto } from '@server/shared/dto';
import { Controller, Inject, Post, Body, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {AuthMessage} from '@server/shared/message'
import { catchError } from 'rxjs';

@Controller({version:'1',path:'auth'})
export class AuthController {
    constructor(
        @Inject('USER_MICROSERVICE') private readonly userService: ClientProxy
    ){}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto):Promise<any>{
        return this.userService.send({
            cmd:AuthMessage.REGISTER,
        },registerUserDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto):Promise<any>{
        return this.userService.send({
            cmd: AuthMessage.LOGIN,
        }, loginUserDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }
}
