import { RpcException } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';
import { RegisterUserDto } from '@server/shared/dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    };

    async register(userDto:RegisterUserDto){
        const userExist = await this.userRepository.findByCondition({email: userDto.email})
        if(userExist){
            console.log('error')
            throw new RpcException('User already exist');
        }
        const hashPassword = this.getHashPassword(userDto.password);
        return await this.userRepository.create({
            ...userDto,
             password: hashPassword,
             role:'user',
        });
    }

    async login(user){
    
    }
}
