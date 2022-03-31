import { IsString, IsEmail, IsNotEmpty, IsUrl,IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto{

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsUrl()
    @ApiProperty()
    image: string;
    
}