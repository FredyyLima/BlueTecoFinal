import {Body, Controller,Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pedido } from '@prisma/client';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@ApiTags('pedido')
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um pedido' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  readAll(): Promise<Pedido[]> {
    return this.pedidoService.findMany();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Lista um pedido pelo seu id' })
  readOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findUnique(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Altera um pedido pelo seu id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: number,
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<Pedido> {
    return this.pedidoService.update(id, createPedidoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui um pedido pelo id caso ele não esteja em uso por uma mesa',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  delete(@Param('id') id: string): Promise<Pedido> {
    return this.pedidoService.delete(id);
  }
}
