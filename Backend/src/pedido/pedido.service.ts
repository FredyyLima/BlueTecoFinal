import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from '@prisma/client';

@Injectable()
export class PedidoService {
    constructor(private prismaService: PrismaService){}

        async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {

            return this.prismaService.pedido.create({
              data: createPedidoDto,
              include: {
                Menu: true,
              }
            });
          }
        
          async findMany(): Promise<Pedido[]> {
            return this.prismaService.pedido.findMany({
              select: {
                Menu: true,
                Table: true,
                id: true,
                menuId: true,
                tableId: true,
              }
            });
          }

          async findUnique(id: number): Promise<Pedido> {

            const pedidoExiste = await this.prismaService.pedido.findUnique({
              where: {
                id: Number(id),
              }
            });
        
            if (!pedidoExiste) {
              throw new NotFoundException('Pedido não encontrado');
            };
        
            return this.prismaService.pedido.findUnique({
              where: {
                id: Number(id),
              },
              select: {
                Menu: true,
                Table: true,
                id: true,
                menuId: true,
                tableId: true,
              }
            });
          }
        
          async update(id: number, createPedidoDto: CreatePedidoDto): Promise<Pedido> {
        
            const pedidoExiste = await this.prismaService.pedido.findUnique({
              where: {
                id: id,
              }
            });
        
            if (!pedidoExiste) {
              throw new NotFoundException('Pedido não encontrado');
            };
        
            return this.prismaService.pedido.update({
              where: {
                id: Number(id),
              },
              data: createPedidoDto,
            });
          }
        
          async delete(id: string): Promise<Pedido> {
        
            const pedidoExiste = await this.prismaService.pedido.findUnique({
              where: {
                id: parseInt(id),
              }
            });
        
            if (!pedidoExiste) {
              throw new NotFoundException('Pedido não encontrado');
            };
        
            const pedidoNaMesa = await this.prismaService.menu.findMany({
              where: {
                id: Number(id),
              },
            });
        
            if (pedidoNaMesa.length > 0) {
              throw new ConflictException(
                'Não foi possível apagar este pedido, pois está sendo solicitado por uma mesa no momento.',
              );
            }
        
            return this.prismaService.pedido.delete({
              where: {
                id: Number(id),
              },
            });
          }
}

