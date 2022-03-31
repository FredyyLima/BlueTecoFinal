import { IsString, IsEmail, IsNotEmpty, MinLength, IsUrl, MaxLength, IsDate } from "class-validator";

export class UserDto{
    id: string;

    @IsEmail({message: "O e-mail digitado não é um e-mail válido."})
    @IsString()
    @IsNotEmpty({message: "O campo e-mail não pode ficar em branco, por favor preencha corretamente."})
    email: string;

    @IsString()
    @IsNotEmpty({message: "O campo primeiro nome não pode ficar em branco, por favor preencha corretamente."})
    firstName: string;

    @IsString()
    @IsNotEmpty({message: "O campo sobrenome não pode ficar em branco, por favor preencha corretamente."})
    lastName: string;

    @IsString()
    @IsNotEmpty({message: "O campo imagem não pode ficar em branco, por favor preencha corretamente."})
    @IsUrl({message: "Você não inseriu um link válido, por favor tente novamente."})
    image: string;
    
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
    
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}