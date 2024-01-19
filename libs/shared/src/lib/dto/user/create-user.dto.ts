import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import mongoose from 'mongoose';

class CompanyDto {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Name is required' })
  name: object;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Email is invalid!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email is invalid!' })
  @IsNotEmpty({ message: 'Email is not empty!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  password: string;

  @IsNotEmpty({ message: 'Phone is required!' })
  phone: string;

  @IsNotEmpty({ message: 'Name is required!' })
  name: string;
}

export class CreateUserDto extends PartialType(RegisterUserDto) {
  @IsNotEmpty({ message: 'Age is required!' })
  age: number;

  @IsNotEmpty({ message: 'Gender is required!' })
  gender: string;

  @IsNotEmpty({ message: 'Address is required!' })
  address: string;

  @IsString({message: 'Role is string!'})
  role: string;

  @IsString({message: 'Office is string!'})
  office_code: string;
}