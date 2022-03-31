import { IsString, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @IsString()
    @ApiProperty()
    name: string;
    
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    quant: number;

}