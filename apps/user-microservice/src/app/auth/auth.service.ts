import { RpcException } from '@nestjs/microservices';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms from 'ms'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { UserRepository } from '../repository/user.repository';
import { RegisterUserDto, LoginUserDto } from '@server/shared/dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}

    getHashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    };

    createRefreshToken = (payload: any) => {
        const refresh_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn:
            ms(this.configService.get<string>('JWT_REFRESH_EXPIRATION')) / 1000,
        });
        return refresh_token;
    };

    createAccessToken = (payload: any) => {
        const access_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn:
            ms(this.configService.get<string>('JWT_ACCESS_EXPIRATION')) / 10000,
        });
        return access_token;
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

    async login(user:LoginUserDto){
        const {email, password} = user;
        const findUser = await this.userRepository.findByCondition({email: email});
        if(!findUser){
            throw new RpcException('User not found');
        }
        const isMatchPassword = compareSync(password, findUser.password);
        if(!isMatchPassword){
            throw new RpcException('Invalid credentials');
        }
        delete findUser.password;
        const refreshToken = this.createRefreshToken({email:findUser.email,name:findUser.name})
        const accessToken = this.createAccessToken(findUser)
;       return {
            email:findUser.email,
            name:findUser.name,
            access_token: accessToken,
            refreshToken: refreshToken,
        }
    }

    async verifyJwt(jwt: string): Promise<{ user:any; exp: number }> {
        if (!jwt) {
            throw new UnauthorizedException();
        }

        try {
            const user = await this.jwtService.verifyAsync(jwt);
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
