import { Controller, Get, Inject, BadRequestException, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from '@server/shared/guard';
import {User} from '@server/shared/decorators'

@Controller({version:'1',path:'user'})
export class UserController {

    constructor(
        @Inject('USER_MICROSERVICE') private readonly userService: ClientProxy
    ){}


    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@User() user){
        return this.userService.send({
            cmd:'get-profile',
        },user._id).pipe(catchError((err) => {
            throw new BadRequestException(err);
        }))
    }
}
