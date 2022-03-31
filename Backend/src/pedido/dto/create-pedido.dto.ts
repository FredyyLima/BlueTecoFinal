import{ IsString, IsNumber, IsNotEmpty} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger';

export class CreatePedidoDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    menuId: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    tableId: string
}