import { IsString, IsEmail, IsNotEmpty, MinLength, IsUrl, MaxLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsEmail({message: "O e-mail digitado não é um e-mail válido."})
    @IsString()
    @IsNotEmpty({message: "O campo e-mail não pode ficar em branco, por favor preencha corretamente."})
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty({message: "O campo primeiro nome não pode ficar em branco, por favor preencha corretamente."})
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty({message: "O campo sobrenome não pode ficar em branco, por favor preencha corretamente."})
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty({message: "O campo senha não pode ficar em branco, por favor preencha corretamente."})
    @MinLength(6, {message: "A senha digitada deve conter entre 6 e 8 caracteres."})
    @MaxLength(8,{message: "A senha digitada deve conter entre 6 e 8 caracteres."})
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty({message: "O campo confirmação de senha não pode ficar em branco, por favor preencha corretamente."})
    @ApiProperty()
    confirmPassword: string;

    @IsString()
    @IsNotEmpty({message: "O campo imagem não pode ficar em branco, por favor preencha corretamente."})
    @IsUrl({message: "Você não inseriu um link válido, por favor tente novamente."})
    @ApiProperty()
    image: string;
}