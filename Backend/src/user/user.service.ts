import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-user.dto'

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

        async create(input: CreateUserDto): Promise<User> {
            const userEmailExists = await this.prismaService.user.findUnique({
                where: { email: input.email},
            })
        
            if (userEmailExists) {
                throw new ConflictException('E-mail já existente. Altere e tente novamente.');
            }

            if(input.password !== input.confirmPassword){
                throw new ConflictException('Senhas digitadas são diferentes. Confira e tente novamente')
            }

            delete input.confirmPassword;

            const hashedPassword = await bcrypt.hash(input.password, 10);

            const createdUser = await this.prismaService.user.create({
                data: {
                    ...input,
                    password: hashedPassword,
                },
            });

            delete createdUser.password;
            
            return createdUser;
        }
    
        async findMany(): Promise<UserDto[]>{
            const users = await this.prismaService.user.findMany({
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                    tables: true,
                }
            });
            return users
        }

        async findUnique(userId: string): Promise<User>{
            const user = await this.prismaService.user.findUnique({
                where: {id: userId},
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    password: true,
                    image: true,
                    createdAt: true,
                    updatedAt: true,
                    tables: true,
                }
            });

            if(!user){
                throw new NotFoundException('Usuário não encontrado')
            }
            delete user.password

            return user
        }

        async update(userId: string, updateUserDto: UpdateUserDto): Promise<User>{
            const user = await this.prismaService.user.findUnique({
                where: {id: userId}
            });

            if(!user){
                throw new NotFoundException('Usuário não encontrado')
            }
            if (updateUserDto.email) {
                const emailExists = await this.prismaService.user.findUnique({
                    where: {
                        email: updateUserDto.email,
                    }
                });

                if (emailExists) {
                    throw new ConflictException('E-mail já cadastrado, altere e tente novamente.');
                }
            }

            const updatedUser = await this.prismaService.user.update({
                where: {id: userId},
                data: {
                    email: updateUserDto.email,
                    firstName: updateUserDto.firstName,
                    lastName: updateUserDto.lastName,
                    image: updateUserDto.image,
                },
            })

            delete updatedUser.password

            return updatedUser
        }

        async delete(userId: string){
            const user = await this.prismaService.user.findUnique({
                where: {id: userId,},
            });

            if(!user){
                throw new NotFoundException('Usuário não encontrado.')
            }

            const deleteUser = await this.prismaService.user.delete({
                where: {id: userId,},
            })
            delete deleteUser.password
            
            return deleteUser
        }
}
