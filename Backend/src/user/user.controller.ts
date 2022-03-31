import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Cria um usuário'
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.create(createUserDto);
  }

  @Get('/buscarTodos')
  @ApiOperation({
    summary: 'Listar todos os usuário'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findMany(): Promise<UserDto[]> {
    return this.userService.findMany();
  }

  @Get(`/buscarUm/:id`)
  @ApiOperation({
    summary: 'Listar um usuário pelo ID'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') userId: string): Promise<User> {
    return this.userService.findUnique(userId);
  }

  @Patch('/update/')
  @ApiOperation({
    summary: 'Atualizar usuario autenticado'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User>{
    return this.userService.update(user.id, updateUserDto)
  }

  @Delete('/delete/')
  @ApiOperation({
    summary: 'Deletar usuario autenticado'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user.id)
  }
}
