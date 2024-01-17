
import { RegisterUserDto } from '@server/shared/dto';
import { Controller, Inject, Post, Body, Logger, Get, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller({version:'1',path:'auth'})
export class AuthController {
    constructor(
        @Inject('USER_MICROSERVICE') private readonly userService: ClientProxy
    ){}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto):Promise<any>{
        return this.userService.send({
            cmd:'register',
        },registerUserDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Get('get-user')
    async getUser(){
        return true;
    }
}
