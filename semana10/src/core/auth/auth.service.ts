import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from 'src/twitter/dto/create-user.dto';
import { UserEntity } from 'src/twitter/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
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
}
