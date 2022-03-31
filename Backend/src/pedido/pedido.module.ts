import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt'})],
  controllers: [PedidoController],
  providers: [PedidoService, PrismaService]
})
export class PedidoModule {}
