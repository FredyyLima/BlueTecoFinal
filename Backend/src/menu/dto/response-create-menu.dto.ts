import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class ResponseCreateMenuDto {
    @IsString()
    @IsNotEmpty()
    nameMenu: string;
    
    @IsNumber()
    @IsNotEmpty()
    priceMenu: number;

    @IsString()
    @IsNotEmpty()
    descriptionMenu: string;

    @IsNumber()
    @IsNotEmpty()
    quant: number;
}