import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { ResponseCreateMenuDto } from './dto/response-create-menu.dto';
import { UpdateMenuDto } from 'src/menu/dto/update-menu.dto';
import { Menu } from '@prisma/client';

@Injectable()
export class MenuService {
    constructor(private prismaService: PrismaService) {}

    async create(createmenudto: CreateMenuDto){

        const mesaAtual = await this.prismaService.menu.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!mesaAtual){
            throw new NotFoundException('Mesa não encontrada!');
        }

        const createMenu = await this.prismaService.menu.create({
            data: { 
                name: createmenudto.name,
                price: createmenudto.price,
                description: createmenudto.description,
                quant: createmenudto.quant,
            }
        });

       const responseCreateMenuDto : ResponseCreateMenuDto = {
            nameMenu: createmenudto.name,
            priceMenu: createmenudto.price,
            descriptionMenu: createmenudto.description,
            quant: createmenudto.quant
        };
        return responseCreateMenuDto;
    }


    async update(userId: string, updateMenuDto: UpdateMenuDto, itemId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {id: userId}
        });

        if(!user){
            throw new NotFoundException('Usuário não encontrado')
        }
    

        const addItem = await this.prismaService.menu.update({
            where: {id: parseInt(itemId)},
            data:{
                name: updateMenuDto.name,
                price: updateMenuDto.price,
                description: updateMenuDto.description,
                quant: updateMenuDto.quant,
            },
        })

        return addItem
    }
    async delete(itemId: string) {

        const itemValidator = await this.prismaService.table.findMany({
            select: {
                User: true,
                createdAt: true,
                itens: true,
                id: true,
                updatedAt: true,
                userId: true,
            }
        });

        const findItem = itemValidator.filter(itm => itm.itens.find(i => i.id === parseInt(itemId)))

        if(findItem){
            throw new UnauthorizedException('Esse item está associado em uma ou mais mesas.')
        }

        const item = await this.prismaService.menu.findUnique({
            where: {id: parseInt(itemId)}
        });

        if(!item){
            throw new NotFoundException('Item do menu não encontrado');
        }

        const deleteItem = await this.prismaService.menu.delete({
            where: {id: parseInt(itemId)},
        });

        return deleteItem
    }

    async findUnique(itemId: string){
        const item = await this.prismaService.menu.findUnique({
            where: {id: parseInt(itemId)},
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                quant: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if(!item){
            throw new NotFoundException('Item do menu não encontrado')
        }

        return item
    }

    async findMany(): Promise<Menu[]>{
        const menu = await this.prismaService.menu.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                quant: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return menu
    }

}
