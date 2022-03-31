import { Body, Controller, Post, UseGuards, Get, Delete, Param, Patch } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User, Table } from '@prisma/client';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Criar uma nova mesa'
  })
  @ApiBearerAuth()
  create(@Body() createTableDto: CreateTableDto, @LoggedUser() user: User): Promise<Table> {
    return this.tableService.create(createTableDto, user.id)
  }

  @Get('all')
  @ApiOperation({
    summary: 'Listar todas as mesas'
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  findMany(): Promise<Table[]>{
    return this.tableService.findMany();
  }

  @Delete('/delete-mesa/:id')
  @ApiOperation({
    summary: 'Deletar uma mesa do sistema'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  delete(@Param('id') tableId: string): Promise<Table> {
    return this.tableService.delete(tableId)
  }

  @Get(`/buscarUm/:id`)
  @ApiOperation({
    summary: 'Listar uma mesa pelo ID'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') tableId: string): Promise<Table> {
    return this.tableService.findUnique(tableId);
  }

  @Patch('/updateTable/:id')
  @ApiOperation({
    summary: 'Editar uma mesa'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, @Param('id') tableId: string , @Body() updateTableDto: UpdateTableDto){
    return this.tableService.update(user.id, updateTableDto, tableId)
  }
}
