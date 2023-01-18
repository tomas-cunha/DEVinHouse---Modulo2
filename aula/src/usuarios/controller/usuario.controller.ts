import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { UsuarioDTO } from '../dto/usuario.dto';
import { UsuarioService } from '../service/usuario.service';

@Controller('user')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Get()
  getUser(): string {
    return this.userService.getHello();
  }

  @Put(':id')
  updateUser(@Body() user: UsuarioDTO, @Param('id') id: number): UsuarioDTO {
    return this.userService.updateUser(user, id);
  }

  @Patch()
  updateCpfUser();
}
