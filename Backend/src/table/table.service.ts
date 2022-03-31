import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService} from 'src/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from '../table/dto/update-table.dto'
import { Table, Menu } from '@prisma/client';

@Injectable()
export class TableService {
    constructor(private prismaService: PrismaService) {}

    async create(createTableDto: CreateTableDto, userId: string): Promise<Table>{
        const tableCreated = await this.prismaService.table.create({
            data: {
                id: createTableDto.id,
                User: { 
                    connect: {
                        id: userId,
                    }
                },
                
            }
        });

        return tableCreated;
    }

    async findMany(): Promise<Table[]> {
        const tables = await this.prismaService.table.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                itens: true
            }
        });

        return tables
    }

    async delete(tableId: string) {

        const table = await this.prismaService.table.findUnique({
            where: {id: tableId}
        });

        if(!table){
            throw new NotFoundException('Mesa não encontrada, verifique.');
        }

        const deleteTable = await this.prismaService.table.delete({
            where: {id: tableId}
        });

        return deleteTable
    }

    async findUnique(tableId: string){
        const table = await this.prismaService.table.findUnique({
            where: {id: tableId},
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                itens: true
            }
        });

        if(!table){
            throw new NotFoundException('Mesa não encontrada, verifique')
        }

        return table
    }

    async update(userId: string, updateTableDto: UpdateTableDto, tableId: string){
        const user = await this.prismaService.user.findUnique({
            where: {id: userId}
        });

        if(!user){
            throw new NotFoundException('Usuário não encontrado')
        }
    

        const editTable = await this.prismaService.table.findUnique({
            where: {id: tableId},
        });
         return editTable
        // const upTable = await this.prismaService.table.update({
        //     where:{id: tableId},
        //     data:{
        //         userId: updateTableDto.userId,
        //     },
        //     include:{
        //         select: {
                    
        //         }
        //     }
        // })
    }
}
