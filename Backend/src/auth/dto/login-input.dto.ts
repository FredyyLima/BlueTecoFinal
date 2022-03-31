import {IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import {ApiProperty} from '@nestjs/swagger';

export class LoginInputDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password: string;
}