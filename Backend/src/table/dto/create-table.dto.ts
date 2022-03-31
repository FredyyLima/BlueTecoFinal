import { IsString, IsNotEmpty,IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateTableDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsOptional()
    id: string
}