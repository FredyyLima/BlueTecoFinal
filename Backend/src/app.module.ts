import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [UserModule, TableModule, MenuModule, AuthModule, PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
