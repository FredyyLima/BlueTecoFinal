import { IsString, IsNotEmpty,IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto{

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    price: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    description: string

    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    quant: number;
}