import { RpcException } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync} from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ){}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    };

    async getAll(){
        return await this.userRepository.findAll();
    }

    async getProfile(userId:string){
        return await this.userRepository.findById(userId);
    }

    async create(userDto){
        const userExist = await this.userRepository.findByCondition({email: userDto.email})
        if(userExist){
            throw new RpcException('User already exist');
        }
        const hashPassword = this.getHashPassword(userDto.password);
        return await this.userRepository.create({
            ...userDto,
                password: hashPassword,
        });
    }

    async update(userDto){
        const userExist = await this.userRepository.findById(userDto._id)
        if(!userExist){
            throw new RpcException('User already exist');
        }
        return await this.userRepository.findByIdAndUpdate(userDto._id, {
            ...userDto,
        });
    }

    async delete(userId){
        return await this.userRepository.deleteOne(userId);
    }
}
