import { Injectable } from '@nestjs/common';
import { UsuarioDTO } from '../dto/usuario.dto';

@Injectable()
export class UsuarioService {
  getHello(): string {
    return 'Hello World!';
  }

  public updateUser(user, id): UsuarioDTO {}

  public updateCPFUser(): string {}
}
