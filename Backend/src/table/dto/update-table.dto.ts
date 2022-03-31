import { IsString,IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client'

export class UpdateTableDto{
    @IsString()
    @IsOptional()
    @ApiProperty()
    userId: string

    @IsOptional()
    @ApiProperty()
    itens: Menu[]
}