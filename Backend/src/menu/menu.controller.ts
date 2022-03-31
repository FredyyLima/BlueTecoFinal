import { Body, Controller, Post, UseGuards, Delete, Param, Patch, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from 'src/menu/dto/update-menu.dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Menu, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../auth/logged-user.decorator'

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar itens para o menu',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() createmenudto: CreateMenuDto) {
    return this.menuService.create(createmenudto);
  }

  @Delete('/delete-item/:id')
  @ApiOperation({
    summary: 'Deletar um item do menu'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  delete(@Param('id') item: string): Promise<Menu> {
    return this.menuService.delete(item)
  }

  @Patch('/updateItem/:id')
  @ApiOperation({
    summary: 'Editar um item do menu'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, @Param('id') itemId: string , @Body() updateMenuDto: UpdateMenuDto){
    return this.menuService.update(user.id, updateMenuDto, itemId)
  }

  @Get(`/buscarUm/:id`)
  @ApiOperation({
    summary: 'Listar um item pelo ID'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') itemId: string): Promise<Menu> {
    return this.menuService.findUnique(itemId);
  }

  @Get('/buscarTodos')
  @ApiOperation({
    summary: 'Listar todos os itens do menu'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findMany(): Promise<Menu[]> {
    return this.menuService.findMany();
  }
}
