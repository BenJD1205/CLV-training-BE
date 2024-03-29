import { Controller, Get, Inject, BadRequestException, UseGuards, Post, Body, Put, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from '@server/shared/guard';
import {User} from '@server/shared/decorators'
import { UserMessage } from '@server/shared/message';
import { CreateUserDto } from '@server/shared/dto';

@Controller({version:'1',path:'user'})
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        @Inject('USER_MICROSERVICE') private readonly userService: ClientProxy
    ){}

    @Get()
    async getAll(){
        return this.userService.send({
            cmd: UserMessage.GET_ALL,
        },{}).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Get('profile')
    async getProfile(@User() user){
        return this.userService.send({
            cmd: UserMessage.GET_PROFILE,
        },user._id).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Get(':id')
    async getUser(@Param() id: string){
        return this.userService.send({
            cmd: UserMessage.GET,
        }, id).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Post('create')
    async createUser(@Body() userDto: CreateUserDto){
        return this.userService.send({
            cmd: UserMessage.CREATE,
        },userDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }

    @Put(':id')
    async updateUser(@Body() userDto: CreateUserDto){
        return this.userService.send({
            cmd: UserMessage.UPDATE,
        },userDto).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }
}
