import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/twitter/dto/create-user.dto';
import { UserEntity } from 'src/twitter/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CredentialsDTO } from './dto/credentiasl.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadUserDto } from './dto/user-payload.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, name, password, username } = createUser;
        const user = this.userRepository.create();
        user.email = email;
        user.name = name;
        user.username = username;
        user.salt = await bcrypt.genSalt(12);
        user.password = await this.hashPassword(password, user.salt);
        const userCreated = await this.userRepository.save(user);
        delete userCreated.password;
        delete user.salt;
        resolve(user);
      } catch (error) {
        reject({ code: error.code, detail: error.detail });
      }
    });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  async signIn(credentials: CredentialsDTO) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }

  changePassword(changePasswordDto: ChangePasswordDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, oldPassword } = changePasswordDto;

        const user = await this.checkCredentials({
          email,
          password: oldPassword,
        } as CredentialsDTO);

        if (user === null) {
          reject(null);
          return;
        }

        user.password = await this.hashPassword(
          changePasswordDto.newPassword,
          user.salt,
        );
        await this.userRepository.save(user);
        resolve('Senha alterada com sucesso');
      } catch (error) {
        reject({ detail: error.detail, code: error.code });
      }
    });
  }
}
